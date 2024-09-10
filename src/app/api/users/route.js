import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng ký người dùng
export async function POST(req) {
  const { username, email, password, role } = await req.json(); // Lấy dữ liệu từ request body

  // Tạo tài khoản người dùng
  const { data, error } = await supabaseApi.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Sau khi đăng ký, thêm thông tin người dùng vào bảng "user"
  const { error: insertError } = await supabaseApi.from('user').insert([
    { username, email, role, is_active: true }
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
