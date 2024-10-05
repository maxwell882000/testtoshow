import {createStore} from "effector";
import {$sideBarToggle} from "./events.ts";

export const $isSideBarOpen = createStore<boolean>(true)
    .on($sideBarToggle, (state) => !state);