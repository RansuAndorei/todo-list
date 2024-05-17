import SignUp from "@/components/Signup/Signup";
import { withoutAuthUser } from "@/utils/functions";

export default async function Page() {
  await withoutAuthUser();
  return <SignUp />;
}
