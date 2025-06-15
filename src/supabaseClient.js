import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kimiyfksyhliaxetcoah.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbWl5ZmtzeWhsaWF4ZXRjb2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODIxMjgsImV4cCI6MjA2NTQ1ODEyOH0.mGUG081JY3snDGrMMmlnAHRPQ2occ0XDKNvxA_0IBIs'
export const supabase = createClient(supabaseUrl, supabaseKey)
