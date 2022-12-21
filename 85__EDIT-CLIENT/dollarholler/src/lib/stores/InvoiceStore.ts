import { displayErrorMessage } from "$lib/utils/handleErrors";
import supabase from "$lib/utils/supabase";
import { writable } from "svelte/store";

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)')
  console.log(data);
  if (error) {
    console.error(error)
    return
  }
  invoices.set(data as Invoice[])
}

export const addInvoice = async (invoiceToAdd: Invoice) => {
  const { lineItems, client, ...newInvoice } = invoiceToAdd;

  // add the invoice
  const invoiceResults = await supabase
    .from('invoice')
    .insert([
      { ...newInvoice, clientId: client.id },
    ])
    .select();

  if (invoiceResults.error) {
    displayErrorMessage(invoiceResults.error)
    return;
  }

  // get the invoice ID
  const invoiceId = invoiceResults.data[0].id;

  // loop over all the line items and add the invoice ID
  if (lineItems && lineItems.length > 0) {
    const newLineItems = lineItems.map((lineItem) => ({ ...lineItem, invoiceId }));

    // add the line items
    const lineItemsResults = await supabase
      .from('lineItems')
      .insert(newLineItems)
      .select();

    if (lineItemsResults.error) {
      displayErrorMessage(lineItemsResults.error)
      return;
    }
  }

  // update the store
  invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }])
  return invoiceToAdd;
}

export const updateInvoice = (invoiceToUpdate: Invoice) => {
  invoices.update((prev: Invoice[]) => prev.map((cur: Invoice) => cur.id === invoiceToUpdate.id ? invoiceToUpdate : cur))
  return invoiceToUpdate;
}

export const deleteInvoice = (invoiceToDelete: Invoice) => {
  invoices.update((prev: Invoice[]) => prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id));
  return invoiceToDelete;
}

export const getInvoiceById = async (id: string) => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)')
    .eq('id', id)
  if (error) {
    console.error(error);
  }
  if (data && data[0]) return data[0] as Invoice;
  console.warn('cannot find invoice with id: ' + id);
}