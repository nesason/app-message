import React from "react";
import { useAuthState } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

export default function DynamicRoute(props) {
    const { user } = useAuthState()
    if (props.authenticated && !user) {
        console.log("1")
        return <Redirect to="/login" />
    }
    else if (props.guest && user) {
        console.log("2")
        return <Redirect to="/" />
    }
    else
{  console.log("3")
    return<Route element={props.element} {...props}/>}


}


