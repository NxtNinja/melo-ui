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
  } catch (error) {
    if (error instanceof HTTPError) {
      const httpError = error as HTTPError;
      const errorJson = await httpError.response.json<any>();
      return {
        success: false,
        message: errorJson.errors[0].message as string,
      };
    } else {
      return {
        success: false,
        message: "Network Error",
      };
    }
  }
};

export default authLogin;
