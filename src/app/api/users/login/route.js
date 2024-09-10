import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng nhập người dùng
export async function POST(req) {
  const { email, password } = await req.json();

  const { data, error } = await supabaseApi.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
