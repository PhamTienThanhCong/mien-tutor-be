import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng ký người dùng
export async function POST(req) {
  const { username, email, password, role } = await req.json(); // Lấy dữ liệu từ request body

  // Tạo tài khoản người dùng
  const { error: insertError } = await supabaseApi.from('user').insert([
    { username, email, password, role, is_active: true }
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // update in table user_profile
  const { error: insertProfileError } = await supabaseApi.from('profile').insert([
    { username }
  ]);

  if (insertProfileError) {
    return NextResponse.json({ error: insertProfileError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Đăng ký tài khoản thành công",
  }, { status: 201 });
}