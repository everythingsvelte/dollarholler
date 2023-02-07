import { displayErrorMessage } from "$lib/utils/handleError";
import supabase from "$lib/utils/supabase";
import { writable } from "svelte/store"

export const settings = writable<Settings>();

export const loadSettings = async () => {

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error) {
    displayErrorMessage(error as Error);
    return;
  }

  settings.set(data)
}