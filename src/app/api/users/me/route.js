import { validateToken } from "@tutor/app/utils/auth";
import { supabaseApi } from "@tutor/supabase/apiRouteClient";
import { NextResponse } from "next/server";

// Xử lý POST request - Đăng ký người dùng
export async function GET(req) {
  const username = await validateToken(req);
  if (!username) {
    return NextResponse.json({ error: "Not Authorized !" }, { status: 400 });
  }
  console.log(username);
  // get user info from database
  const { data, error } = await supabaseApi
    .from("user")
    .select("*")
    .eq("username", username);

  if (error || data.length === 0) {
    return NextResponse.json({ error: "Không tìm thấy thông tin người dùng" }, { status: 400 });
  }

  const user = data[0];
  return NextResponse.json(user, { status: 200 });
}