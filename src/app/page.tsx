import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import LikeButton from "@/components/shsfui/button/like-button";
import Image from "next/image";

export default function Home() {
  return (
    <ProtectedLayout>
      <div className="flex justify-center items-center h-screen">
        <LikeButton />
      </div>
    </ProtectedLayout>
  );
}
