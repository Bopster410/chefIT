"use client"
import { useUserWithFetch } from "@/entities/user";
import { ProfilePage } from "./index.component";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProfilePageContainer() {
  const user = useUserWithFetch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.back();
      return;
    }
  }, [user, router]);

  if (!user) return;
  return <ProfilePage user={user} />;
}
