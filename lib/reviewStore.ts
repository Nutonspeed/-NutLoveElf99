import { promises as fs } from "fs";
import path from "path";

export interface ReviewEntry {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  photo?: string;
  createdAt: string;
}

const FILE = path.join(process.cwd(), "mock/store/reviews.json");

async function readFileSafe(): Promise<ReviewEntry[]> {
  try {
    const text = await fs.readFile(FILE, "utf8");
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function writeFileSafe(data: ReviewEntry[]) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function addReview(entry: Omit<ReviewEntry, "id" | "createdAt">) {
  const list = await readFileSafe();
  if (list.find((r) => r.orderId === entry.orderId)) return false;
  const newEntry: ReviewEntry = {
    id: `rv-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  list.push(newEntry);
  await writeFileSafe(list);
  return true;
}

export async function listReviews(orderId?: string): Promise<ReviewEntry[]> {
  const list = await readFileSafe();
  return orderId ? list.filter((r) => r.orderId === orderId) : list;
}
