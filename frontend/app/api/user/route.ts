import { createClient } from "@supabase/supabase-js";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export async function POST(req: Request) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { email } = await req.json();
  const existing = await supabase
    .from("users")
    .select(email)
    .eq("email", email);

  if (existing.data && existing.data.length > 0) {
    return new Response(
      JSON.stringify({ message: "Email already subscribed" }),
      { status: 400 }
    );
  }
  const { data, error } = await supabase.from("users").insert([{ email }]);
  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  return new Response(
    JSON.stringify({ message: `Subscribed ${email} successfully` }),
    {
      status: 200,
    }
  );
}
