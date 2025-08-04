import { cookies } from "next/headers";
import api from "../ky/server";
import { User } from "@directus/types";
import refreshAuthToken from "./refreshToken";
import { HTTPError } from "ky";

const getAuthenticatedUser = async () => {
  try {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("access_token");

    const sessionToken = accessTokenCookie?.value as string;

    const { data } = await api
      .get("users/me", {
        cache: "no-store",
        next: { tags: ["getAuthenticatedUser"] },
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
      .json<{ data: User }>();

    return data;
  } catch (error) {
    // If we get a 401, try to refresh the token
    if (error instanceof HTTPError && error.response.status === 401) {
      console.log("Access token expired, attempting to refresh...");

      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Try again with the new token
        try {
          const cookieStore = await cookies();
          const newToken = cookieStore.get("access_token")?.value as string;

          const { data } = await api
            .get("users/me", {
              cache: "no-store",
              next: { tags: ["getAuthenticatedUser"] },
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            })
            .json<{ data: User }>();

          console.log("Successfully fetched user after token refresh:", data);
          return data;
        } catch (retryError) {
          console.error(
            "Failed to fetch user after token refresh:",
            retryError
          );
          return undefined;
        }
      }
    }

    console.log(error);
    return undefined;
  }
};

export default getAuthenticatedUser;
