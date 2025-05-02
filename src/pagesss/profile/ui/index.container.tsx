"use client"
import { useUserOrToLogin } from "@/entities/user";
import { ProfilePage } from "./index.component";

export function ProfilePageContainer() {
  const user = useUserOrToLogin();

  if (!user) return;
  return <ProfilePage user={user} />;
}
