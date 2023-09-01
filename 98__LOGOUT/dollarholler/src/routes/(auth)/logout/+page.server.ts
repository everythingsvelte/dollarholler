import { redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase } }) => {
  await supabase.auth.signOut();
  throw redirect(303, '/login')
}