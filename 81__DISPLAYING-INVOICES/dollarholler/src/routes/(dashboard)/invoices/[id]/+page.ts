import { getInvoiceById } from "$lib/stores/InvoiceStore";

interface Props {
  params: {
    id: string
  }
}

export async function load({ params }: Props) {
  const id = params?.id;
  const invoice = await getInvoiceById(id);
  console.log({ invoice });
  return { invoice };
};