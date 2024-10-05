import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import AuthProtected from "./middlewares/AuthProtected.tsx";
import {Routing} from "./pages/routing/Routing.tsx";
import {Pages} from "./dtos/routing/page.ts";
import WelcomePage from "./pages/welcome/WelcomePage.tsx";
import UsersPage from "./pages/users/UsersPage.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Routing/>,
        children: [
            {
                path: Pages.LOGIN,
                element: <LoginPage/>
            },
            {
                path: Pages.WELCOME,
                element: <AuthProtected>
                    <WelcomePage/>
                </AuthProtected>
            },
            {
                path: Pages.USERS,
                element: <UsersPage/>
            }
        ]
    }
]);

export default router;