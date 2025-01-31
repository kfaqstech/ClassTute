import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://qvrqemrzdyfnjcqueblu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2cnFlbXJ6ZHlmbmpjcXVlYmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MTc3MTYsImV4cCI6MjA1MzA5MzcxNn0.-C9d0XVhsvi-1c4vFIQrWF5-E33BMvrgZlR2aNdykSE';

let supabase: SupabaseClient

if (Platform.OS === 'web') {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
}

export {
  supabase
}