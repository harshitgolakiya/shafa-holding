"use client";

import { ArrowDown, ArrowUp, ChevronDown, ImagePlus, Library, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { resetDocumentAction, saveDocumentAction } from "@/app/admin/actions";
import { ui } from "@/app/admin/ui";
import { getDocumentSchema, type Field } from "@/cms/schema";

type Data = Record<string, unknown>;

type EditorProps = {
  documentKey: string;
  initialData: unknown;
  hasSavedVersion: boolean;
};

export function Editor({ documentKey, initialData, hasSavedVersion }: EditorProps) {
  const schema = getDocumentSchema(documentKey)!;
  const router = useRouter();
  const [data, setData] = useState(initialData as Data);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ ok?: boolean; message?: string }>({});
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(next: Data) {
    setData(next);
    setDirty(true);
    setStatus({});
  }

  function save() {
    const missing = findMissingImages(schema.fields, data);
    if (missing.length) {
      setStatus({ message: `Choose an image for: ${missing.join(", ")}.` });
      return;
    }
    startTransition(async () => {
      const result = await saveDocumentAction(documentKey, data);
      setStatus(result);
      if (result.ok) {
        setDirty(false);
        router.refresh();
      }
    });
  }

  function reset() {
    if (!window.confirm("Discard all edits to this page and restore the original content?")) return;
    startTransition(async () => {
      const result = await resetDocumentAction(documentKey);
      setStatus(result);
      if (result.ok) window.location.reload();
    });
  }

  return (
    <div className="pb-28">
      <div className="mt-8 space-y-6">
        <FieldList fields={schema.fields} value={data} onChange={update} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e2e1d6] bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
          <p role="status" className={`mr-auto text-sm ${status.ok ? "text-green-700" : status.message ? "text-red-700" : "text-[#5a6056]"}`}>
            {status.message ?? (dirty ? "You have unpublished changes." : "All changes are live.")}
          </p>
          {schema.path ? (
            <a href={schema.path} target="_blank" rel="noreferrer" className={ui.buttonSecondary}>
              View page
            </a>
          ) : null}
          {hasSavedVersion ? (
            <button type="button" onClick={reset} disabled={pending} className={ui.buttonSecondary}>
              Restore original
            </button>
          ) : null}
          <button type="button" onClick={save} disabled={pending || !dirty} className={ui.button}>
            {pending ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function findMissingImages(fields: Field[], value: Data, prefix = ""): string[] {
  return fields.flatMap((field) => {
    const label = prefix ? `${prefix} › ${field.label}` : field.label;
    const fieldValue = value?.[field.key];
    if (field.type === "image") return fieldValue ? [] : [label];
    if (field.type === "group") return findMissingImages(field.fields, fieldValue as Data, label);
    if (field.type === "list") {
      return ((fieldValue as Data[]) ?? []).flatMap((item, index) => findMissingImages(field.fields, item, `${label} ${index + 1}`));
    }
    return [];
  });
}

function emptyValue(fields: Field[]): Data {
  return Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.type === "group" ? emptyValue(field.fields) : field.type === "list" || field.type === "strings" ? [] : "",
    ]),
  );
}

function FieldList({ fields, value, onChange }: { fields: Field[]; value: Data; onChange: (value: Data) => void }) {
  // Consecutive loose fields share a card; each group renders as its own card.
  const chunks: Field[][] = [];
  for (const field of fields) {
    const last = chunks.at(-1);
    if (field.type !== "group" && last && last[0].type !== "group") last.push(field);
    else chunks.push([field]);
  }

  return chunks.map((chunk) => {
    const inputs = chunk.map((field) => (
      <FieldInput key={field.key} field={field} value={value?.[field.key]} onChange={(next) => onChange({ ...value, [field.key]: next })} />
    ));
    return chunk[0].type === "group" ? inputs : <div key={chunk[0].key} className={`${ui.card} space-y-5 p-5`}>{inputs}</div>;
  });
}

function FieldInput({ field, value, onChange, nested = false }: { field: Field; value: unknown; onChange: (value: unknown) => void; nested?: boolean }) {
  const id = useId();

  switch (field.type) {
    case "group": {
      const group = (value as Data) ?? {};
      const children = field.fields.map((child) => (
        <FieldInput key={child.key} field={child} value={group[child.key]} onChange={(next) => onChange({ ...group, [child.key]: next })} nested />
      ));
      return nested ? (
        <fieldset className="rounded-md border border-[#e2e1d6] bg-[#faf9f5] p-4">
          <legend className="px-1 text-sm font-semibold">{field.label}</legend>
          <div className="space-y-5">{children}</div>
        </fieldset>
      ) : (
        <section className={`${ui.card} p-5`}>
          <h2 className="text-base font-semibold">{field.label}</h2>
          {field.help ? <p className={ui.help}>{field.help}</p> : null}
          <div className="mt-4 space-y-5">{children}</div>
        </section>
      );
    }
    case "list":
      return <ListInput field={field} value={(value as Data[]) ?? []} onChange={onChange} />;
    case "strings":
      return <StringsInput field={field} value={(value as string[]) ?? []} onChange={onChange} />;
    case "image":
      return <ImageInput field={field} value={(value as string) ?? ""} onChange={onChange} />;
    default:
      return (
        <div>
          <label htmlFor={id} className={ui.label}>{field.label}</label>
          {field.type === "textarea" ? (
            <textarea id={id} value={(value as string) ?? ""} onChange={(event) => onChange(event.target.value)} rows={3} className={`${ui.input} mt-1.5 min-h-20 field-sizing-content`} />
          ) : (
            <input id={id} type="text" inputMode={field.type === "url" ? "url" : undefined} value={(value as string) ?? ""} onChange={(event) => onChange(event.target.value)} className={`${ui.input} mt-1.5`} />
          )}
          {field.help ? <p className={ui.help}>{field.help}</p> : null}
        </div>
      );
  }
}

function move<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function StringsInput({ field, value, onChange }: { field: Extract<Field, { type: "strings" }>; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div>
      <p className={ui.label}>{field.label}</p>
      {field.help ? <p className={ui.help}>{field.help}</p> : null}
      <ul className="mt-2 space-y-2">
        {value.map((item, index) => (
          <li key={index} className="flex items-start gap-1">
            {item.length > 90 ? (
              <textarea aria-label={`${field.itemLabel} ${index + 1}`} value={item} onChange={(event) => onChange(value.map((v, i) => (i === index ? event.target.value : v)))} className={`${ui.input} field-sizing-content`} />
            ) : (
              <input aria-label={`${field.itemLabel} ${index + 1}`} value={item} onChange={(event) => onChange(value.map((v, i) => (i === index ? event.target.value : v)))} className={ui.input} />
            )}
            <button type="button" className={ui.iconButton} aria-label="Move up" disabled={index === 0} onClick={() => onChange(move(value, index, index - 1))}><ArrowUp className="size-4" /></button>
            <button type="button" className={ui.iconButton} aria-label="Move down" disabled={index === value.length - 1} onClick={() => onChange(move(value, index, index + 1))}><ArrowDown className="size-4" /></button>
            <button type="button" className={ui.iconButton} aria-label={`Remove ${field.itemLabel.toLowerCase()}`} onClick={() => onChange(value.filter((_, i) => i !== index))}><X className="size-4" /></button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...value, ""])} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#78672e] hover:underline">
        <Plus aria-hidden="true" className="size-4" /> Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function ListInput({ field, value, onChange }: { field: Extract<Field, { type: "list" }>; value: Data[]; onChange: (value: Data[]) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function add() {
    onChange([...value, emptyValue(field.fields)]);
    setOpenIndex(value.length);
  }

  return (
    <div>
      <p className={ui.label}>{field.label}</p>
      {field.help ? <p className={ui.help}>{field.help}</p> : null}
      <ul className="mt-2 space-y-2">
        {value.map((item, index) => {
          const open = openIndex === index;
          const title = String(item?.[field.titleKey] ?? "").trim() || `New ${field.itemLabel.toLowerCase()}`;
          return (
            <li key={index} className="rounded-md border border-[#e2e1d6] bg-[#faf9f5]">
              <div className="flex items-center gap-1 pr-2">
                <button type="button" onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open} className="flex min-h-11 flex-1 items-center gap-2 px-3 text-left text-sm font-medium">
                  <ChevronDown aria-hidden="true" className={`size-4 shrink-0 text-[#5a6056] transition ${open ? "" : "-rotate-90"}`} />
                  <span className="text-xs tabular-nums text-[#5a6056]">{index + 1}.</span>
                  <span className="truncate">{title}</span>
                </button>
                <button type="button" className={ui.iconButton} aria-label="Move up" disabled={index === 0} onClick={() => { onChange(move(value, index, index - 1)); setOpenIndex(null); }}><ArrowUp className="size-4" /></button>
                <button type="button" className={ui.iconButton} aria-label="Move down" disabled={index === value.length - 1} onClick={() => { onChange(move(value, index, index + 1)); setOpenIndex(null); }}><ArrowDown className="size-4" /></button>
                <button
                  type="button"
                  className={ui.iconButton}
                  aria-label={`Remove ${title}`}
                  onClick={() => {
                    if (!window.confirm(`Remove “${title}”?`)) return;
                    onChange(value.filter((_, i) => i !== index));
                    setOpenIndex(null);
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              {open ? (
                <div className="space-y-5 border-t border-[#e2e1d6] bg-white p-4">
                  {field.fields.map((child) => (
                    <FieldInput key={child.key} field={child} value={item?.[child.key]} onChange={(next) => onChange(value.map((v, i) => (i === index ? { ...v, [child.key]: next } : v)))} nested />
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={add} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#78672e] hover:underline">
        <Plus aria-hidden="true" className="size-4" /> Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

type MediaListItem = { id: number; url: string; filename: string };

function ImageInput({ field, value, onChange }: { field: Field; value: string; onChange: (value: string) => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [library, setLibrary] = useState<MediaListItem[] | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/admin/api/media", { method: "POST", body });
      const result = (await response.json()) as { url?: string; message?: string };
      if (!response.ok || !result.url) throw new Error(result.message ?? "Upload failed.");
      onChange(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function openLibrary() {
    setError("");
    const response = await fetch("/admin/api/media");
    if (!response.ok) {
      setError("Could not load the media library.");
      return;
    }
    setLibrary((await response.json()) as MediaListItem[]);
  }

  return (
    <div>
      <p className={ui.label}>{field.label}</p>
      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="grid aspect-4/3 w-full shrink-0 place-items-center overflow-hidden rounded-md border border-[#e2e1d6] bg-[#f1efe7] sm:w-44">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- plain preview of arbitrary CMS paths
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span className="text-xs text-[#5a6056]">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => fileInput.current?.click()} disabled={uploading} className={ui.buttonSecondary}>
              <ImagePlus aria-hidden="true" className="size-4" /> {uploading ? "Uploading…" : "Upload new"}
            </button>
            <button type="button" onClick={openLibrary} className={ui.buttonSecondary}>
              <Library aria-hidden="true" className="size-4" /> Choose from library
            </button>
          </div>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} />
          <p className="truncate text-xs text-[#5a6056]" title={value}>{value || "—"}</p>
          <p className={ui.help}>JPG, PNG, WebP or AVIF up to 8 MB. Large landscape images (at least 2000px wide) work best for hero sections.</p>
          {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
        </div>
      </div>

      {library ? (
        <div role="dialog" aria-modal="true" aria-label="Media library" className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setLibrary(null)}>
          <div className="max-h-[85svh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Choose an image</h2>
              <button type="button" className={ui.iconButton} aria-label="Close" onClick={() => setLibrary(null)}><X className="size-4" /></button>
            </div>
            {library.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#5a6056]">No uploaded images yet. Use “Upload new” to add one.</p>
            ) : (
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {library.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(item.url);
                        setLibrary(null);
                      }}
                      className={`block w-full overflow-hidden rounded-md border-2 text-left transition hover:border-[#9f8c50] ${item.url === value ? "border-[#9f8c50]" : "border-transparent"}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail grid */}
                      <img src={item.url} alt="" className="aspect-4/3 w-full bg-[#f1efe7] object-cover" loading="lazy" />
                      <span className="block truncate px-1 py-1 text-xs text-[#5a6056]">{item.filename}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
