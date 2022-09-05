import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const isRegistered = localStorage.getItem("isRegistered");
    // console.log("...", isLoggedIn);

    if (isLoggedIn === false || isLoggedIn === null) {
        // console.log("lOGGING OUT");
        return (<Navigate to="/login" />);
    }
    else {
        // console.log("lOGGING IN");
        return <Outlet />;
    }
}

export default ProtectedRoute;