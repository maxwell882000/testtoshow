import { AuthLoginRequest } from "./dtos/requests/authLoginRequest.ts";
import { axiosInstance } from "../../axiosInstance.ts";
import { AuthRegisterRequest } from "./dtos/requests/authRegisterRequest.ts";
import { AuthTokenResponse } from "./dtos/responses/authTokenResponse.ts";

export class AuthService {
  static async login(request: AuthLoginRequest) {
    const response = await axiosInstance.post<AuthTokenResponse>("auth/login", request);
    return response.data;
  }

  static async register(request: AuthRegisterRequest) {
    const response = await axiosInstance.post<AuthTokenResponse>("auth/register", request);
    return response.data;
  }

  static async logOut() {
    await axiosInstance.get("auth/log-out");
  }

}
