import "server-only";
import { MongoClient, type Collection } from "mongodb";

// 클릭 수 문서: _id 는 링크 id, count 는 누적 클릭 수.
export type ClickDoc = { _id: string; count: number };

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

// 개발 서버는 코드가 바뀔 때마다 모듈을 다시 불러오므로,
// 연결을 전역에 보관해 연결이 계속 늘어나지 않게 한다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결을 붙잡고 있지 않도록 비워서 다음 요청에서 다시 시도하게 한다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db(DB_NAME).collection<ClickDoc>("clicks");
}
