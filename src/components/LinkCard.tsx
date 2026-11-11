import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border-2 border-zinc-900 bg-white px-6 py-5 text-center text-lg font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-100 active:translate-y-0 dark:border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
    >
      {link.title}
    </a>
  );
}
