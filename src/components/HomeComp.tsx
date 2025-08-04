"use client";

import api from "@/utils/ky/client";
import { Button } from "./ui/button";
import { deleteCookies, getRefreshToken } from "@/app/actions/authCookie";
import { useRouter } from "next/navigation";

const HomeComp = () => {
  const { push } = useRouter();
  const logout = async () => {
    const refreshTokenCookie = await getRefreshToken();
    const res = await api.post("auth/logout", {
      next: { tags: ["authLogout"] },
      json: {
        refresh_token: refreshTokenCookie,
      },
    });

    await deleteCookies();

    if (res.status === 204) {
      push("/login");
    }
  };
  return (
    <>
      <div className="">
        <Button onClick={logout} variant={"destructive"}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default HomeComp;
