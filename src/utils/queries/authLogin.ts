import { HTTPError } from "ky";
import api from "../ky/client";
import { LoginSchemaData } from "@/schema/authSchema";

const authLogin = async (lData: LoginSchemaData) => {
  try {
    //
    await api.post("auth/login", {
      next: { tags: ["authLogin"] },
      json: {
        email: lData.email,
        password: lData.password,
        mode: "session",
      },
    });

    return {
      success: true,
      message: "User Login Successful",
    };
  } catch {
    return {
      success: false,
      message: "Login failed. Please check your credentials and try again.",
    };
  }
};

export default authLogin;
