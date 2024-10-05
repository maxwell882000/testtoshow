import React from "react";
import UserNameModal from "./UserNameModal.tsx";

function UserNameButtonRenderer(props: any) {
    const {data: user} = props;
    return <UserNameModal user={user}/>;
}

export default UserNameButtonRenderer
