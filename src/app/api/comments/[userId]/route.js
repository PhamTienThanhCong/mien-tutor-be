import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem danh sách nhận xét của người dùng
export async function GET(req, { params }) {
  const { userId } = params; // Lấy userId từ URL

  // Truy vấn nhận xét dành cho người dùng
  const { data, error } = await supabaseApi
    .from('comment')
    .select('*')
    .eq('username_voted', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data.length) {
    return NextResponse.json({ message: 'Không có nhận xét.' }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
