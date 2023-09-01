import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      const message = 'Passwords do not match';
      return fail(400, { error: message })
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      return fail(400, { error: error.message })
    } else {
      throw redirect(303, '/invoices')
    }
  }
}