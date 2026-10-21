import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/cms/auth";
import { getContentForEditor } from "@/cms/content";
import { getDocumentSchema } from "@/cms/schema";
import { formatDate, ui } from "../../../ui";
import { Editor } from "./Editor";

type Props = { params: Promise<{ key: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const schema = getDocumentSchema((await params).key);
  return { title: schema?.title ?? "Content" };
}

export default async function EditContentPage({ params }: Props) {
  await requireUser();
  const schema = getDocumentSchema((await params).key);
  if (!schema) notFound();
  const { data, updatedAt, updatedBy } = await getContentForEditor(schema.key);

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/content" className="inline-flex items-center gap-1.5 text-sm text-[#5a6056] hover:text-[#1c2417]">
        <ArrowLeft aria-hidden="true" className="size-4" /> All pages
      </Link>
      <h1 className={`${ui.pageTitle} mt-4`}>{schema.title}</h1>
      <p className="mt-2 text-sm text-[#5a6056]">
        {schema.description}{" "}
        {updatedAt ? `Last edited ${formatDate(updatedAt)}${updatedBy ? ` by ${updatedBy}` : ""}.` : "Currently showing the original content."}
      </p>
      <Editor documentKey={schema.key} initialData={data} hasSavedVersion={Boolean(updatedAt)} />
    </div>
  );
}
