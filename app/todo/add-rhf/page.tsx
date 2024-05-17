import Todo from "@/components/Todo/Todo";
import { withAuthUser } from "@/utils/functions";

export default async function Page() {
  const user = await withAuthUser();
  return <Todo user={user} url="/todo/add-rhf" />;
}
