import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase';

const supabaseUrl = 'https://qxmwiqlnokzllesdxpbz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4bXdpcWxub2t6bGxlc2R4cGJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzYwNjc0OSwiZXhwIjoxOTkzMTgyNzQ5fQ.MgVjIk-I7jc3GjZD6S2niL78asTe05hsj1CwWi18yEs'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)