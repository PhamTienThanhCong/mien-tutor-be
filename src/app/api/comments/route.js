import { validateToken } from "@tutor/app/utils/auth";
import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Gửi nhận xét
export async function POST(req) {
  const { username_voted, comment } = await req.json(); // Lấy dữ liệu từ request body

  const username = await validateToken(req);
  if (!username) {
    return NextResponse.json({ error: "Not Authorized !" }, { status: 401 });
  }

  // Thêm nhận xét mới vào bảng `comment`
  const { data, error } = await supabaseApi
    .from('comment')
    .insert([{ username_voted, username, comment }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Đã gửi nhận xét thành công !",
  }, { status: 201 });
}  