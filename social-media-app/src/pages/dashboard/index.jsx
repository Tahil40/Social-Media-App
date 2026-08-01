import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction/PostAction";
import {fetchUserProfile} from "@/config/redux/action/authAction/AuthAction";

export default function Dashboard(){
    const router = useRouter();
    const [IsTokenPresent, SetIsTokenPresent] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("token") === "null"){
            router.push("/auth/login"); 
        };

        SetIsTokenPresent(true);
    }, []);

    useEffect(() => {
        if(IsTokenPresent){
            dispatch(getAllPosts());
            dispatch(fetchUserProfile({token: localStorage.getItem("token")}));
        };
    }, [IsTokenPresent]);

    return(
        <>

        </>
    );
};