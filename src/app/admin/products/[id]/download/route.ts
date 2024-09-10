import db from "@/db/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: {id}}: { params: { id: string}}) {
  const data = db.product.findUnique({ where: { id}, select: { filePath: true}})
}