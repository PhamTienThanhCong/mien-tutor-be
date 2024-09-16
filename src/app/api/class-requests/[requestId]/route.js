import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem danh sách yêu cầu lớp học
export async function GET(req, { params }) {
    const { requestId } = params;
    const { data, error } = await supabaseApi
      .from('yeu_cau_mo_lop')
      .select('*')
      .eq('id', requestId);
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // get user info
    const { data: user, error: userError } = await supabaseApi
      .from('user')
      .select('username, full_name, avatar, is_active, address, phone, email, role')
      .eq('username', data[0].username);

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }
  
    return NextResponse.json({
      ...data[0],
      author: user[0]
    }, { status: 200 });
  }


// Xử lý PUT request - Cập nhật yêu cầu lớp học
export async function PUT(req, { params }) {
    const { requestId } = params;
    const { subject, address, total_price, time, note, due_date } = await req.json();

    // Cập nhật thông tin yêu cầu lớp học trong database yeu_cau_mo_lop
    const { error: updateError } = await supabaseApi
      .from('yeu_cau_mo_lop')
      .update({
        subject,
        address,
        total_price,
        time,
        note,
        due_date
      })
      .eq('id', requestId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Cập nhật yêu cầu lớp học thành công' }, { status: 200 });
  }