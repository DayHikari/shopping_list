import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
// import 'dotenv/config'

const supabaseUrl = "https://vbldxckvbxnolqpykkhi.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZibGR4Y2t2Ynhub2xxcHlra2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyODgwMTMsImV4cCI6MjAyMTg2NDAxM30.1t8e_vOhs1lwl9Z7iQa-ozdUgVY7y3uTkrOOp0pjW-o"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})