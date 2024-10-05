import {$getAllUserFx, $getUserFx, $loginFx, $logOutFx} from "./effects.ts";
import {authDomain} from "./domain.ts";
import {
    $allUsersActivityChanged,
    $allUsersChanged,
    $askLogOut,
    $closeLogOut,
    $collectUserActivityChanged,
    $resetUserActivity,
    $userChanged
} from "./events.ts";
import {UserDto} from "../../dtos/user/userDto.ts";
import {sample} from "effector";
import {UsersGate, WelcomeGate} from "./gates.ts";

export const $isLoginLoading = $loginFx.pending;

export const $logOut = authDomain.createStore<boolean>(false)
    .on($askLogOut, () => true)
    .on($closeLogOut, () => false);

export const $isLogOutLoading = $logOutFx.pending;

export const $user = authDomain.createStore<UserDto>(null)
    .on($userChanged, (r, _) => _)
    .reset(WelcomeGate.close);

export const $allUsers = authDomain.createStore<UserDto[]>([])
    .on($allUsersChanged, (r, _) => _)
    .on($allUsersActivityChanged, (prevState, activityChangedUsers) => {
        return [...prevState.map((user) => {
            const foundUser = activityChangedUsers.filter(e => e.id === user.id)[0]
            if (foundUser) {
                return foundUser
            }
            return user;
        })]
    })
    .reset(UsersGate.close);


export const $collectUserActivity = authDomain.createStore<UserDto[]>([])
    .on($collectUserActivityChanged, (prevState, user) => {
        if (!prevState.filter(u => u.id === user.id).length) {
            prevState.push(user);
            return [...prevState]
        }
        return [...prevState.map((u) => u.id === user.id ? user : u)]
    })
    .on($resetUserActivity, () => []);

export const $isAllUsersLoading = $getAllUserFx.pending;

sample({
    source: WelcomeGate.open,
    target: $getUserFx
});

sample({
    source: UsersGate.open,
    target: [$getAllUserFx, $resetUserActivity]
})
