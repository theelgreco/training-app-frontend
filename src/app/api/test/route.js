import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const data = { msg: "hi" };
  return NextResponse.json(data);
}
