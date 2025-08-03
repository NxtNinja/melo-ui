import ky from "ky";
import env from "../env/client";

const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  mode: "cors",
});

export default api;
