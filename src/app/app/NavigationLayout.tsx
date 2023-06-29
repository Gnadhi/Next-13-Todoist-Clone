import { authOptions } from "../api/auth/[...nextauth]/route";
import { getUserId } from "./account/page";
import Navbar from "@/ui/app/Navbar";
import { getServerSession } from "next-auth";

export type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} | null;

export default async function NavigationLayout() {
  let sessionUser = (await getServerSession(authOptions).then(
    (session) => session?.user
  )) as User;
  const userId = await getUserId(sessionUser);

  return <Navbar userId={userId} />;
}
