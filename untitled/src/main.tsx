import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {
    RouterProvider
} from "react-router-dom";
import router from "./router.tsx";
import {ChakraProvider} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {ToastContainer} from "react-toastify"; // Optional Theme applied to the Data Grid
import "react-toastify/dist/ReactToastify.css";
import "react-international-phone/style.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ToastContainer/>
        <ChakraProvider>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </StrictMode>
);
