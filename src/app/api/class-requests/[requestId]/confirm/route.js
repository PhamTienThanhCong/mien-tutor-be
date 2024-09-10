import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý PUT request - Gia sư xác nhận yêu cầu thuê lớp học
export async function PUT(req, { params }) {
  const { requestId } = params; // Lấy requestId từ URL
  const { tutorId } = await req.json(); // Lấy thông tin gia sư xác nhận

  const { data, error } = await supabaseApi
    .from('danh_sach_lop')
    .update({ status: 'confirmed', tutor_id: tutorId }) // Cập nhật trạng thái và gia sư xác nhận
    .eq('id', requestId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
