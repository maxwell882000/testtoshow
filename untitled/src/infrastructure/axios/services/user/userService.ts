import {axiosInstance} from "../../axiosInstance.ts";
import {AuthTokenResponse} from "../auth/dtos/responses/authTokenResponse.ts";
import {AuthRegisterRequest} from "../auth/dtos/requests/authRegisterRequest.ts";
import {GetUserResponse} from "./dtos/responses/getUserResponse.ts";
import {SetUserActivityRequest} from "./dtos/requests/setUserActivityRequest.ts";

export class UserService {
    static async getUser() {
        const response = await axiosInstance.get<GetUserResponse>("user");
        return response.data;
    }

    static async getAllUser() {
        const response = await axiosInstance.get<GetUserResponse[]>("user/all");
        return response.data;
    }

    static async setUserActivity(request: SetUserActivityRequest) {
        const response = await axiosInstance.put("user/set-activity", request);
        return response.data;
    }
}