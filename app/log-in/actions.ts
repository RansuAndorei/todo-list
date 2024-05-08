"use server";

import { createClient } from "@/utils/supabase/server";

export const handleLogin = async (email: string, password: string) => {
  const supabaseClient = createClient();
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
};
