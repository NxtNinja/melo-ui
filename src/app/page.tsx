import LikeButton from "@/components/shsfui/button/like-button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("directus_session_token");
  console.log(token);

  const cookie = token?.value;

  if (cookie === undefined) {
    return redirect("/login");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <LikeButton />
    </div>
  );
}
