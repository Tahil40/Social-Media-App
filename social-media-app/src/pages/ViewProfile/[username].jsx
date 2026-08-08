import React from "react";
import {useSearchParams} from "next/navigation";
import { clientServer } from "@/config/axiosConfig/axioxConfig";

export default function ViewProfilePage({userProfile}){
    const searchParams = useSearchParams();

    return(
        <>
        {userProfile}
        </>
    );
};

export async function getServerSideProps(context){
    console.log(context.query.username);
    const request = await clientServer.get("/user/get-profile-based-on-username", {
        params: {
            username: context.query.username, 
        }
    }); 

    const response = await request.data;

    return {
        props: {
            userProfile: response.profile,
        }
    };
};