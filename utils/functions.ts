import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function withAuthUser() {
  const supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) {
    redirect("/log-in");
  }
  return user;
}

export async function withoutAuthUser() {
  const supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (user) {
    redirect("/todo");
  }
}
