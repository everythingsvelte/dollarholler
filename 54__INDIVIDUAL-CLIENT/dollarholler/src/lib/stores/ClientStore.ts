import { writable } from "svelte/store";
import data from "../../seed.json";

export const clients = writable<Client[]>([]);

export const loadClients = () => {
  clients.set(data.clients);
}

export const addClient = (clientToAdd: Client) => {
  clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: "active" }]);
  return clientToAdd;
}

export const updateClient = (clientToUpdate: Client) => {
  clients.update((prev: Client[]) => prev.map((cur: Client) => cur.id === clientToUpdate.id ? clientToUpdate : cur));
  return clientToUpdate;
}

export const getClientById = (id: string) => {
  return data.clients.find(client => client.id === id);
}