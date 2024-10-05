import {useUnit} from "effector-react";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {$page} from "../../states/routing/stores.ts";
import {$pageChanged} from "../../states/routing/events.ts";


export const Routing = () => {
    const navigate = useNavigate();
    useEffect(() => {
        $pageChanged.watch((page) => {
            navigate(page);
        })
    }, []);
    return <>
        <Outlet/>
    </>;
};