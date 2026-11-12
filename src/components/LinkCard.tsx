import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  // mailto: 같은 링크는 새 탭을 열면 빈 탭만 남으므로 현재 탭에서 연다.
  const isWebLink = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      {...(isWebLink && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex w-full items-center justify-center gap-2.5 rounded-3xl border border-(--glass-border) bg-(--glass) px-6 py-[1.125rem] text-[1.0625rem] font-semibold text-ink shadow-[0_8px_24px_-12px_rgb(var(--shadow-warm)/0.3),inset_0_1px_0_rgb(255_255_255/0.6)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out hover:bg-(--glass-hover) hover:shadow-[0_12px_28px_-12px_rgb(var(--shadow-warm)/0.38),inset_0_1px_0_rgb(255_255_255/0.7)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--shadow-warm)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
    >
      {link.emoji && (
        <span aria-hidden="true" className="text-lg leading-none">
          {link.emoji}
        </span>
      )}
      <span>{link.title}</span>
    </a>
  );
}
