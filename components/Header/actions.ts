"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  const supabaseClient = createClient();
  await supabaseClient.auth.signOut();
  redirect("/log-in");
};
