import {$loginFx} from "./effects.ts";
import {FormEvent} from "react";
import {formDataToJson} from "../../utils/formDataToJson.ts";
import {AuthLoginRequest} from "../../infrastructure/axios/services/auth/dtos/requests/authLoginRequest.ts";
import {authDomain} from "./domain.ts";
import {UserDto} from "../../dtos/user/userDto.ts";

export const $login = $loginFx.prepend((e: FormEvent) => {
    return formDataToJson(
        new FormData(e.target as HTMLFormElement)
    ) as AuthLoginRequest;
});

export const $askLogOut = authDomain.createEvent();
export const $closeLogOut = authDomain.createEvent();
export const $userChanged = authDomain.createEvent<UserDto>();
export const $allUsersChanged = authDomain.createEvent<UserDto[]>();
export const $allUsersActivityChanged = authDomain.createEvent<UserDto[]>();
export const $collectUserActivityChanged = authDomain.createEvent<UserDto>();
export const $resetUserActivity = authDomain.createEvent();
