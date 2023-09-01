// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './types/database.types'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}