import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem hồ sơ người dùng
export async function GET(req, { params }) {
  const { userId } = params; // Lấy userId từ URL

  // lấy thông tin người dùng từ database user và profile thông qua userId
  const { data, error } = await supabaseApi
    .from('user')
    .select('id, username, email, role, is_active')
    .eq('username', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  // Lấy thông tin hồ sơ người dùng từ database profile thông qua username
  const { data: profileData, error: profileError } = await supabaseApi
    .from('profile')
    .select('*')
    .eq('username', data[0].username);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 404 });
  }

  return NextResponse.json({ ...data[0], profile:profileData[0] }, { status: 200 });
}

// Xử lý PUT request - Cập nhật hồ sơ người dùng
export async function PUT(req, { params }) {
    const { userId } = params;
    const {
      role,
      is_active,
      address,
      avatar,
      gender,
      cccd,
      introduction,
      job,
      full_name,
      phone,
      password,
    } = await req.json();

    // Cập nhật thông tin người dùng trong database user. cái nào rỗng thì không cập nhật
    const { error: updateError } = await supabaseApi
      .from('user')
      .update({
        role,
        is_active,
        password,
      })
      .eq('username', userId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Cập nhật thông tin hồ sơ người dùng trong database profile. cái nào rỗng thì không cập nhật
    const { error: updateProfileError } = await supabaseApi
      .from('profile')
      .update({
        address,
        avatar,
        gender,
        cccd,
        introduction,
        job,
        full_name,
        phone,
      })
      .eq('username', userId);

    if (updateProfileError) {
      return NextResponse.json({ error: updateProfileError.message }, { status: 500 });
    }
  
    return NextResponse.json({
      message: "Cập nhật hồ sơ thành công",
    }, { status: 200 });
  }