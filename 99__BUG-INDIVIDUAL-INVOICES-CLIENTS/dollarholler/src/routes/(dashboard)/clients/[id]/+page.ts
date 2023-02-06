import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getClientById } from "$lib/stores/ClientStore";

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)

  if (session) {
    const id = event?.params?.id;
    const client = await getClientById(id, event);
    console.log({ client });
    return { client };
  }
}