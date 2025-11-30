import { createClient } from "@supabase/supabase-js";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export async function GET(req: Request) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("pelosi")
    .select("*")
    .order("action_date", { ascending: false });
  return new Response(JSON.stringify(data), { status: 200 });
}
