interface Invoice {
  client: Client
  createdAt: string
  discount?: number
  dueDate: string
  id: string
  invoiceNumber: string
  invoiceStatus: InvoiceStatus
  issueDate: string
  lineItems?: LineItem[]
  notes?: string
  subject?: string
  terms?: string
}

interface LineItem {
  amount: number
  description: string
  id: string
  quantity: number
}

interface Client {
  clientStatus?: ClientStatus
  city?: string
  email?: string
  id: string
  name: string
  state?: string
  street?: string
  zip?: string
  invoice?: Invoice[]
}

interface Settings {
  myName: string
  email: string
  street: string
  city: string
  state: string
  zip: string
}

type NotificationType = "success" | "error" | "info" | "warning";

interface Snackbar {
  id: string
  message: string
  type: NotificationType
}

interface Error {
  code: string
  details: string,
  hint: string,
  message: string
}