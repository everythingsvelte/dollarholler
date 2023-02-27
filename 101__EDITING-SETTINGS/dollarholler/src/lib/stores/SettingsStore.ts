import { displayErrorMessage } from "$lib/utils/handleError";
import supabase from "$lib/utils/supabase";
import { writable } from "svelte/store"
import { snackbar } from "./SnackbarStore";

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

export const updateSettings = async (newSettings: Settings) => {
  const { error } = await supabase
    .from('settings')
    .update(newSettings)
    .eq('id', newSettings.id);

  if (error) {
    displayErrorMessage(error as Error);
    return;
  }

  snackbar.send({ message: 'Settings were successfully updated', type: 'success' })

  settings.update(() => newSettings);
}