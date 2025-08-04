import { HTTPError } from "ky";
import api from "../ky/client";
import { LoginSchemaData, SignupSchemaData } from "@/schema/authSchema";
import { Cookie, create } from "@/app/actions/authCookie";

const authRegister = async (lData: SignupSchemaData) => {
  try {
    //
    const response = await api.post("users", {
      next: { tags: ["authRegister"] },
      json: {
        first_name: lData.first_name,
        last_name: lData.last_name,
        email: lData.email,
        password: lData.password,
      },
    });
    return {
      success: true,
      message: "User Created successfully. Please login to continue.",
    };
  } catch {
    return {
      success: false,
      message:
        "Registration failed. Either you are already registered or something went wrong.",
    };
  }
};

export default authRegister;
