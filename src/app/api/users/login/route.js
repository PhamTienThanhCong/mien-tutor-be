import { encrypt } from "@tutor/app/utils/Security";
import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng nhập người dùng
export async function POST(req) {
  const { email, password } = await req.json();

  // Tìm kiếm người dùng với email và password khớp
  const { data, error } = await supabaseApi
    .from("user")
    .select("*")
    .eq("email", email)
    .eq("password", password);

  if (error || data.length === 0) {
    return NextResponse.json({ error: "Email hoặc mật khẩu không chính xác" }, { status: 400 });
  }

  const username = data[0].username;
  // current timestamp
  const timestamp = new Date().getTime();

  const token = encrypt(JSON.stringify({ username, timestamp }));

  return NextResponse.json({
    token,
    tokenType: "Bearer",
  }, { status: 200 });
}
