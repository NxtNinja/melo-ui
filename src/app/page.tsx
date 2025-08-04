import LikeButton from "@/components/shsfui/button/like-button";
import { get } from "./actions/authCookie";

export default async function Home() {
  const cookie = await get();
  return (
    <div className="flex justify-center items-center h-screen">
      <LikeButton />
    </div>
  );
}
