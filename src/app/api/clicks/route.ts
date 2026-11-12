import { connection } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

const linkIds = links.map((link) => link.id);

// 모든 링크의 현재 클릭 수를 한 번에 돌려준다: { counts: { github: 42, ... } }
export async function GET() {
  // 빌드 때 미리 렌더링하지 않고 항상 요청 시점의 값을 읽는다.
  await connection();

  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: linkIds } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[clicks] 조회 실패:", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 한 링크의 클릭 수를 1 늘린다. 본문: { id: "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 아무 값이나 DB에 쌓이지 않게 한다.
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (err) {
    console.error("[clicks] 증가 실패:", err);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
