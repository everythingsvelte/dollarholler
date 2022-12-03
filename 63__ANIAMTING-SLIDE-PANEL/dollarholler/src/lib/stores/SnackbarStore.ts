import { writable } from "svelte/store"
import { v4 as uuidv4 } from "uuid"

const newSnackbar = () => {
  const { update, subscribe } = writable<Snackbar[]>([])

  function send(content: { message: string, type: NotificationType }) {
    const newContent = { id: uuidv4(), ...content }
    update(store => [...store, newContent])
  }

  function remove(id: string | null = null) {
    update(store => {
      if (id) return store.filter(item => item.id !== id)
      const [, ...rest] = store;
      return [...rest];
    })
  }

  return { subscribe, send, remove };
}

export const snackbar = newSnackbar()