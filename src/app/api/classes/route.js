import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem danh sách lớp học
export async function GET() {
    const { data, error } = await supabaseApi
      .from('lop_hoc')
      .select('*');
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

// Xử lý POST request - Tạo lớp học sau khi yêu cầu được xác nhận
export async function POST(req) {
  const { id_danh_sach_lop, id_yeu_cau_nhan_lop, id_tutor, id_user, address, price, time, note } = await req.json();

  const { data, error } = await supabaseApi
    .from('lop_hoc')
    .insert([
      { id_danh_sach_lop, id_yeu_cau_nhan_lop, id_tutor, id_user, address, price, time, status: 'active', note }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
