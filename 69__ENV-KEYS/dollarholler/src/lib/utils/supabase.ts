import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lkynzsuxhxvdtcdlosxm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxreW56c3V4aHh2ZHRjZGxvc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA3OTY1ODYsImV4cCI6MTk4NjM3MjU4Nn0.NwNsri2RG4XghpxFsJoQfoXoZfIlcTWHFZVYb7SHtgU')

export default supabase