import type { PageLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { getInvoiceById } from "$lib/stores/InvoiceStore";

export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event)

  if (session) {
    const id = event?.params?.id;
    const invoice = await getInvoiceById(id, event);
    console.log({ invoice });
    return { invoice };
  }
};