interface Invoice {
  client: Client;
  clientId: string;
  createdAt: string;
  dueDate: string;
  id: string;
  invoiceNumber: string;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  lineItems?: LineItem[];
  notes?: string;
  subject?: string;
  terms?: string;
}

interface LineItem {
  amount: number;
  description: string;
  id: string;
  quantity: number;
  invoiceId: string;
}

interface Client {
  clientStatus: ClientStatus;
  city: string;
  email: string;
  id: string;
  name: string;
  state: string;
  street: string;
  zip: string;
}

interface Settings {
  city: string;
  email: string;
  myName: string;
  state: string;
  street: string;
  zip: string;
}
