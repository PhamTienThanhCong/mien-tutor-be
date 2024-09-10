import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Gửi nhận xét
export async function POST(req) {
  const { username_voted, username, comment } = await req.json(); // Lấy dữ liệu từ request body

  // Thêm nhận xét mới vào bảng `comment`
  const { data, error } = await supabaseApi
    .from('comment')
    .insert([{ username_voted, username, comment, vote_up: 0, vote_down: 0 }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
