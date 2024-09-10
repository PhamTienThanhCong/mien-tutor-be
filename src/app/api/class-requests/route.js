import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem danh sách yêu cầu lớp học
export async function GET() {
    const { data, error } = await supabaseApi
      .from('danh_sach_lop')
      .select('*')
      .eq('status', 'pending');  // Chỉ lấy các yêu cầu đang chờ
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

// Xử lý POST request - Tạo yêu cầu thuê lớp học
export async function POST(req) {
  const { username, subject, address, price_option, total_price, time, note, due_date } = await req.json();

  const { data, error } = await supabaseApi
    .from('danh_sach_lop')
    .insert([{ username, subject, address, price_option, total_price, time, note, due_date, status: 'pending' }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
