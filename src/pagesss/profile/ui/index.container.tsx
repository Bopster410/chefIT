"use client";
import { useUserWithFetch } from "@/entities/user";
import { ProfilePage } from "./index.component";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MockUser } from "@/entities/user/api";

export function ProfilePageContainer(){
    const user = useUserWithFetch();
    const router = useRouter();
    
    // useEffect(()=>{
    //     if(!user){
    //         router.back();
    //         return;
    //     } 
    // },[user]);

    if(!user) return <ProfilePage user={MockUser} />;
    return <ProfilePage user={user}/>
}