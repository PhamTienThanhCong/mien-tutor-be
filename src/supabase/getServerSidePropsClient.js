import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "./supabaseClient";

export function getServerSidePropsClient(context) {
  return createServerSupabaseClient(context, supabase);
}
