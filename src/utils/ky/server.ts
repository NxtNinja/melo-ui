import ky from "ky";
import env from "../env/server";

const api = ky.create({
  prefixUrl: env.API_URL,
  credentials: "include",
  mode: "cors",
});

export default api;
