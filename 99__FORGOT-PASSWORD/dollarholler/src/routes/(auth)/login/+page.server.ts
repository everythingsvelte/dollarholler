import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError } from '@supabase/supabase-js'

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: 'Invalid credentials.',
          values: {
            email,
          },
        })
      }
      return fail(500, {
        error: 'Server error. Try again later.',
        values: {
          email,
        },
      })
    }

    throw redirect(303, '/invoices')
  },
}
