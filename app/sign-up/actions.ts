"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export const handleSignUpOAuth = async (provider: Provider) => {
  const supabaseClient = createClient();
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: provider,
  });
  if (error) throw error;
};

export const handleSignUp = async (email: string, password: string) => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
};
