// Shared class names for the CMS screens.
export const ui = {
  input:
    "w-full rounded-md border border-[#d3d2c5] bg-white px-3 py-2 text-sm text-[#1c2417] outline-none transition focus:border-[#9f8c50] focus:ring-2 focus:ring-[#9f8c50]/25",
  label: "block text-sm font-semibold text-[#1c2417]",
  help: "mt-1 text-xs leading-5 text-[#5a6056]",
  card: "rounded-lg border border-[#e2e1d6] bg-white",
  button:
    "inline-flex min-h-9 items-center justify-center gap-2 rounded-md bg-[#1c2417] px-4 text-sm font-semibold text-white transition hover:bg-[#2c3825] disabled:cursor-not-allowed disabled:opacity-50",
  buttonSecondary:
    "inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#d3d2c5] bg-white px-4 text-sm font-semibold text-[#1c2417] transition hover:border-[#9f8c50] disabled:cursor-not-allowed disabled:opacity-50",
  buttonDanger:
    "inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50",
  iconButton:
    "inline-grid size-8 place-items-center rounded-md text-[#5a6056] transition hover:bg-[#f1efe7] hover:text-[#1c2417] disabled:opacity-30",
  pageTitle: "font-(family-name:--font-display) text-4xl leading-none text-[#1c2417]",
};

export function formatDate(value: Date | string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dubai" }).format(new Date(value));
}
