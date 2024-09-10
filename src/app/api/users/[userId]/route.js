import { supabaseApi } from "@yeardle/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý GET request - Xem hồ sơ người dùng
export async function GET(req, { params }) {
  const { userId } = params; // Lấy userId từ URL

  const { data, error } = await supabaseApi.from('user').select('*').eq('id', userId).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

// Xử lý PUT request - Cập nhật hồ sơ người dùng
export async function PUT(req, { params }) {
    const { userId } = params;
    const { username, phone } = await req.json();
  
    const { data, error } = await supabaseApi
      .from('user')
      .update({ username, phone })
      .eq('id', userId);
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }