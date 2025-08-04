import LikeButton from "@/components/shsfui/button/like-button";
import { get } from "./actions/authCookie";
import env from "@/utils/env/client";
import api from "@/utils/ky/server";
import { Suspense } from "react";
import getAuthenticatedUser from "@/utils/queries/getMe";
import HomeComp from "@/components/HomeComp";

export default async function Home() {
  const cookie = await get();

  const user = await getAuthenticatedUser();

  console.log(user);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* User Info */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello, {user?.first_name} {user?.last_name}!
        </h1>
        <p className="text-gray-600 mb-4">
          You successfully signed in with your email {user?.email}
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-green-800 text-sm">
            🎉 Congratulations! If you're seeing this protected page, it means
            your account has been successfully created and you're logged in.
          </p>
        </div>
      </div>

      <HomeComp />
    </div>
  );
}
