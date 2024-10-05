import { AuthToken } from "./dtos/auth/authToken.ts";
import moment from "moment";

export class AuthStorage {
  static deleteToken() {
    localStorage.removeItem("token");
  }

  static setToken(token: AuthToken) {
    token.expiresIn = moment().add(token.expiresIn - 20, "seconds").unix();
    localStorage.setItem("token", JSON.stringify(token));
  }

  static getToken(): AuthToken | null {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(localStorage.getItem("token")) : null;
  }

  static isToken(): boolean {
    const token = AuthStorage.getToken();
    return token !== null && token.expiresIn > moment().unix();
  }
}
