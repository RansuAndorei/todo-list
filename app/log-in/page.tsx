import Login from "@/components/Login/Login";
import { withoutAuthUser } from "@/utils/functions";

export default async function Page() {
  await withoutAuthUser();

  return <Login />;
}
