import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem cuộc hội thoại giữa hai người dùng
export async function GET(req) {
    const { userId1, userId2 } = req.query; // Lấy userId của hai người dùng từ URL
  
    // Truy vấn các tin nhắn giữa hai người dùng
    const { data, error } = await supabaseApi
      .from('chat')
      .select('*')
      .or(`user_id_1.eq.${userId1},user_id_2.eq.${userId2}`)
      .or(`user_id_1.eq.${userId2},user_id_2.eq.${userId1}`)
      .order('created', { ascending: true });
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    if (!data.length) {
      return NextResponse.json({ message: 'Không có tin nhắn trong cuộc hội thoại này.' }, { status: 404 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

// Xử lý POST request - Gửi tin nhắn giữa hai người dùng
export async function POST(req) {
  const { user_id_1, user_id_2, content } = await req.json(); // Lấy dữ liệu từ request body

  // Thêm tin nhắn vào bảng `chat`
  const { data, error } = await supabaseApi
    .from('chat')
    .insert([{ user_id_1, user_id_2, content, created: new Date() }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
