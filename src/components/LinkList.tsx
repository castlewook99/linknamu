"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

const CLICKS_API = "/api/clicks";

// 링크를 열면 페이지가 바뀌거나 메일 앱이 뜨더라도 요청이 끊기지 않도록
// sendBeacon 을 우선 쓰고, 지원하지 않으면 keepalive fetch 로 보낸다.
function recordClick(id: string) {
  const body = JSON.stringify({ id });
  const sent =
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon(CLICKS_API, new Blob([body], { type: "application/json" }));
  if (!sent) {
    fetch(CLICKS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여 준다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch(CLICKS_API, { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { counts: Record<string, number> }) => {
        // 받아 오는 사이에 누른 클릭이 사라지지 않도록 더 큰 값을 유지한다.
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, n);
          return next;
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.warn("클릭 수를 불러오지 못했습니다:", err);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    recordClick(id);
    // 서버 응답을 기다리지 않고 화면의 숫자를 바로 올린다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
