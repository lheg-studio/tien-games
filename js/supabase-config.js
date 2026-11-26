const SUPABASE_URL = "https://tqbimtouajyhvozpneit.supabase.co";
const SUPABASE_KEY = "sb_publishable_xw-7YtuhvcvyTfPUbDed-w_bAfSgNrh";

window.tgSupabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
