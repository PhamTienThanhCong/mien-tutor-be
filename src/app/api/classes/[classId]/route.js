import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem chi tiết lớp học
export async function GET(req, { params }) {
  const { classId } = params;

  const { data, error } = await supabaseApi
    .from('lop_hoc')
    .select('*')
    .eq('id', classId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Xử lý PUT request - Cập nhật thông tin lớp học
export async function PUT(req, { params }) {
    const { classId } = params;
    const { address, price, time, note, status } = await req.json(); // Lấy thông tin cập nhật
  
    const { data, error } = await supabaseApi
      .from('lop_hoc')
      .update({ address, price, time, note, status })
      .eq('id', classId);
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }