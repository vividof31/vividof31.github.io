import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucpchbtrtjpwkhqltadc.supabase.co';
// IMPORTANT: It's generally recommended to use environment variables for keys,
// especially in non-demo projects, rather than hardcoding them directly.
// For Vite, you'd use import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcGNoYnRydGpwd2tocWx0YWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDk0NzQsImV4cCI6MjA1OTcyNTQ3NH0.B4pqCJwiYVD9sMcqZP1q5gR2a16YIpDvfOppT4p3KFU';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
