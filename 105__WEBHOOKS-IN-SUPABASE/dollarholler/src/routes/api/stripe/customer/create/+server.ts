import { API_ROUTE_SECRET } from '$env/static/private';
import type { RequestEvent } from "../../../../$types";
import { stripeClient } from '$lib/utils/stripe';
import { json } from "@sveltejs/kit";
import supabase from "$lib/utils/supabase";

export const POST = async (event: RequestEvent) => {
  if (event.url.searchParams.get('API_ROUTE_SECRET') !== API_ROUTE_SECRET) return new Response('You are not authorized to access this route', { status: 401 });

  const result = await event.request.json();
  const { name, id, email, city, state, zip, street } = result;

  const stripeCustomer = await stripeClient.customers.create({
    name, email, address: { line1: street, city, state, postal_code: zip }, metadata: { supabaseUserId: id }
  });
  console.log({ stripeCustomer })

  const { error } = await supabase.from('client').update({ stripeId: stripeCustomer.id }).eq('id', id)
  if (error) return json({ message: `Problem updating the database ${error.message}` }, { status: 401 });

  return json({ message: `stripe customer was created ${stripeCustomer.id}` }, { status: 200 });
}