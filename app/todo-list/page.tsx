import Todo from "@/components/TodoList/Todo";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabaseClient = createClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return user && <Todo user={user} />;
}
