import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fingerprint sederhana untuk identify user tanpa login
export function getFingerprint(): string {
  if (typeof window === "undefined") return "";
  let fp = localStorage.getItem("babeh_fp");
  if (fp) return fp;
  fp =
    navigator.userAgent.length.toString(36) +
    screen.width.toString(36) +
    screen.height.toString(36) +
    Date.now().toString(36);
  localStorage.setItem("babeh_fp", fp);
  return fp;
}
