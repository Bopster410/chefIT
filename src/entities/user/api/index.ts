import { ajaxGet } from "@/shared/api";
import { User } from "./index.types";
import { USER_API } from "./index.constants";

export type { User } from "./index.types";

export async function getUser() {
    return await ajaxGet<User>({
        url: USER_API.getUser
    });
}

export { useUserWithFetch } from "./index.hooks"