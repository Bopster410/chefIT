"use client";
import { useUserWithFetch } from "@/entities/user";
import { ProfileEditPage } from "./index.component";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MockUser } from "@/entities/user/api";

export function ProfileEditPageContainer(){
    const user = useUserWithFetch();
    const router = useRouter();
    
    // useEffect(()=>{
    //     if(!user){
    //         router.back();
    //         return;
    //     } 
    // },[user]);

    if(!user) return <ProfileEditPage user={MockUser} />;
    return <ProfileEditPage user={user}/>
}