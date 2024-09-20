import { generateUsername } from "@tutor/app/utils/auth";
import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng ký người dùng
export async function POST(req) {
  const { full_name, email, password, role, phone = "", is_active = false } = await req.json(); // Lấy dữ liệu từ request body

  // Kiểm tra dữ liệu đầu vào
  if (!full_name || !email || !password) {
    return NextResponse.json({ error: "Thiếu thông tin đăng ký" }, { status: 400 });
  }

  let { username, username_add } = generateUsername(full_name); // Tạo username từ họ tên
  // kieem tra username đã tồn tại chưa
  let { data: userCheck, error: errorCheck } = await supabaseApi.from('user').select('id').eq('username', username);
  if (errorCheck) {
    return NextResponse.json({ error: errorCheck.message }, { status: 500 });
  }

  if (userCheck.length > 0) {
    username = username_add;
  }

  // Tạo tài khoản người dùng
  const { error: insertError } = await supabaseApi.from('user').insert([
    { username, full_name, email, password, role, is_active, phone }
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Đăng ký tài khoản thành công",
  }, { status: 201 });
}