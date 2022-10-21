import { invalid } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }: RequestEvent) => {
    const data = await request.formData();

    // get all the data from our
    const allData = Object.fromEntries(data.entries());

    const existingClient = data.get('client');
    const newClient = data.get('newClient');
    const newClientEmail = data.get('email');

    // client required
    // user must select an existing client or include the new client's name
    if (!existingClient && !newClient && !newClientEmail) {
      return invalid(400, { existingClient, missing: true, error: true, data: allData })
    }

    // if the user added a new client email, but they did not add a new client name
    if (newClientEmail && !newClient) {
      return invalid(400, { newClient, missing: true, error: true, data: allData })
    }

    // if the user tried to add a new client, then they must include the client
    // name and an email
    if (newClient && !newClientEmail) {
      return invalid(400, { newClientEmail, missing: true, error: true, data: allData })
    }

    return {
      success: true
    }
  }
}