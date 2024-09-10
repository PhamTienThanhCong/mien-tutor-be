import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Cập nhật quá trình học
export async function POST(req) {
  const { id_tutor, id_lop_hoc, date, status, exam, score, note } = await req.json();

  // Thêm dữ liệu mới vào bảng quá trình học
  const { data, error } = await supabaseApi
    .from('qua_trinh_hoc')
    .insert([
      { id_tutor, id_lop_hoc, date, status, exam, score, note }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
