import UserNameButtonRenderer from "./UserNameButtonRenderer.tsx";

export const columns = [
    {
        headerName: "Username",
        field: "userName",
        cellRenderer: UserNameButtonRenderer, // Custom button renderer for modal
    },
    {
        headerName: "Active", field: "isActive",
    },
]