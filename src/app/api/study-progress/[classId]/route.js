import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem quá trình học của một lớp
export async function GET(req, { params }) {
  const { classId } = params; // Lấy classId từ URL

  // Truy vấn dữ liệu quá trình học từ bảng `qua_trinh_hoc`
  const { data, error } = await supabaseApi
    .from('qua_trinh_hoc')
    .select('*')
    .eq('id_lop_hoc', classId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data.length) {
    return NextResponse.json({ message: 'Không có dữ liệu quá trình học.' }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
