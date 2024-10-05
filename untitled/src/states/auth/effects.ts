import {authDomain} from "./domain.ts";
import {AuthService} from "../../infrastructure/axios/services/auth/authService.ts";
import {AuthLoginRequest} from "../../infrastructure/axios/services/auth/dtos/requests/authLoginRequest.ts";
import {AuthStorage} from "../../infrastructure/localStorage/authStorage.ts";
import {AuthToken} from "../../infrastructure/localStorage/dtos/auth/authToken.ts";
import {$pageChanged} from "../routing/events.ts";
import {Pages} from "../../dtos/routing/page.ts";
import {successNotification} from "../../utils/notifications/successNotification.ts";
import {$allUsersActivityChanged, $allUsersChanged, $closeLogOut, $resetUserActivity, $userChanged} from "./events.ts";
import {UserService} from "../../infrastructure/axios/services/user/userService.ts";
import {UserDto} from "../../dtos/user/userDto.ts";
import {GetUserResponse} from "../../infrastructure/axios/services/user/dtos/responses/getUserResponse.ts";


export const $loginFx = authDomain.createEffect(async (request: AuthLoginRequest) => {
    try {
        const authTokenResponse = await AuthService.login(request);
        console.log(authTokenResponse);
        AuthStorage.setToken(authTokenResponse as AuthToken);
        $pageChanged(Pages.WELCOME);
        successNotification("Login successful !");
    } catch (e) {
        console.error(e);
    }
});

export const $logOutFx = authDomain.createEffect(async () => {
    try {
        await AuthService.logOut();
        AuthStorage.deleteToken();
        $closeLogOut();
        $pageChanged(Pages.LOGIN);
        successNotification("Log out successful !");
    } catch (e) {
        console.error(e);
    }
});

export const $getUserFx = authDomain.createEffect(async () => {
    const result: GetUserResponse = await UserService.getUser();
    $userChanged(result as UserDto);
})

export const $getAllUserFx = authDomain.createEffect(async () => {
    const result: GetUserResponse[] = await UserService.getAllUser();
    $allUsersChanged(result.map<UserDto>(e => ({...e})));
})

export const $setUserActivityFx = authDomain.createEffect(async (users: UserDto[]) => {
    await UserService.setUserActivity({users});
    successNotification("Users activity successfully updated !");
    $resetUserActivity();
    $allUsersActivityChanged(users);
})