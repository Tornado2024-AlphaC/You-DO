import { createClient } from "@supabase/supabase-js";

//環境変数が設定されているかを確認
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("環境変数が設定されていません");
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const spabase = createClient(supabaseUrl, supabaseKey);

export default spabase;
