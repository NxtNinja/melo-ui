import { HTTPError } from "ky";
import api from "../ky/client";
import { LoginSchemaData } from "@/schema/authSchema";
import { Cookie, create } from "@/app/actions/authCookie";

const authLogin = async (lData: LoginSchemaData) => {
  try {
    //
    const response = await api.post("auth/login", {
      next: { tags: ["authLogin"] },
      json: {
        email: lData.email,
        password: lData.password,
      },
    });

    const data = await response.json<{ data: Cookie }>();

    console.log(data.data);

    await create(data.data);
    return {
      success: true,
      message: "User Login successful",
    };
  } catch {
    return {
      success: false,
      message: "Login failed. Please check your credentials and try again.",
    };
  }
};

export default authLogin;
