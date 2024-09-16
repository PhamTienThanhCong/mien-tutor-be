import { validateToken } from "@tutor/app/utils/auth";
import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Nhận lớp học
export async function POST(req, { params }) {
  const { requestId } = params;
  const { total_price, description, plan } = await req.json();

  const username = await validateToken(req);
  if (!username) {
    return NextResponse.json({ error: "Not Authorized !" }, { status: 400 });
  }

  // Kiểm tra xem yêu cầu mở lớp đã tồn tại chưa
  const { data, error } = await supabaseApi
    .from('yeu_cau_mo_lop')
    .select('status')
    .eq('id', requestId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data.length) {
    return NextResponse.json({ error: 'Yêu cầu không tồn tại' }, { status: 404 });
  }

  // Tạo yêu cầu nhận lớp
  const { data: data2, error: error2 } = await supabaseApi
    .from('yeu_cau_nhan_lop')
    .insert({
      id_lop: requestId,
      username,
      total_price,
      description,
      plan,
    });

  if (error2) {
    return NextResponse.json({ error: error2.message }, { status: 500 });
  }

  // Trả về phản hồi khi yêu cầu được tạo thành công
  return NextResponse.json({ message: 'Yêu cầu nhận lớp được tạo thành công' }, { status: 201 });
}

// Xử lý GET request - Lấy thông tin yêu cầu nhận lớp
export async function GET(req, { params }) {
  const { requestId } = params;

  // Lấy thông tin yêu cầu nhận lớp
  const { data, error } = await supabaseApi
    .from('yeu_cau_nhan_lop')
    .select('id, id_lop, username, total_price, description, plan, created_at')
    .eq('id_lop', requestId)
    // xắp xếp theo thời gian tạo yêu cầu
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Trả về thông tin yêu cầu nhận lớp
  return NextResponse.json(data);
}

// Xử lý DELETE request - Hủy yêu cầu nhận lớp
export async function DELETE(req, { params }) {
  const { requestId } = params;

  const username = await validateToken(req);
  if (!username) {
    return NextResponse.json({ error: "Not Authorized !" }, { status: 400 });
  }

  // Xóa yêu cầu nhận lớp
  const { error: error2 } = await supabaseApi
    .from('yeu_cau_nhan_lop')
    .delete()
    .eq('id_lop', requestId)
    .eq('username', username);

  if (error2) {
    return NextResponse.json({ error: error2.message }, { status: 500 });
  }

  // Trả về phản hồi khi yêu cầu được xóa thành công
  return NextResponse.json({ message: 'Yêu cầu nhận lớp đã bị hủy' });
}