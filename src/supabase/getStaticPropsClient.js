import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "./supabaseClient";

export function getStaticPropsClient(context) {
  return createServerSupabaseClient(context, supabase);
}
