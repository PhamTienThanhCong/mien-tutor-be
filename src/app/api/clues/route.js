import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request
export async function GET() {
  const { data, error } = await supabaseApi.from("clues").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Xử lý POST request
export async function POST(req) {
  const { question, answer } = await req.json(); // Lấy dữ liệu từ request body
  const { data, error } = await supabaseApi.from("clues").insert([{ question, answer }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
