import { cookies } from "next/headers";
import api from "../ky/server";
import { Cookie, create } from "@/app/actions/authCookie";

const refreshAuthToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      console.log("No refresh token found");
      return false;
    }

    const response = await api.post("auth/refresh", {
      json: {
        refresh_token: refreshToken,
      },
    });

    const data = await response.json<{ data: Cookie }>();
    
    // Update cookies with new tokens
    await create(data.data);
    
    return true;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return false;
  }
};

export default refreshAuthToken;
