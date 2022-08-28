interface Invoice {
  dueDate: string,
  id: string,
  invoiceNumber: number,
  client: Client,
  lineItems?: LineItem[],
  invoiceStatus: InvoiceStatus
}

interface Client {
  id: string,
  name: string,
}

interface LineItem {
  id: string,
  amount: number;
  description: string;
  quantity: number;
  invoiceId: number;
}

