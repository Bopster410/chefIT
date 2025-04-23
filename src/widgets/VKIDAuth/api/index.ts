import { Config } from "@vkid/sdk";
import { CLIENT_ID } from "./index.constants";
import { generateCodeChallenge, generateRandomString } from "@/shared/api";

export async function initVKSDK() {
  const codeChallenge = "DkaKPL9Mzlp5n6SYrOkkgBoBbK2JahDgQlg4nqQVfx0"
  const state = generateRandomString(16);

  sessionStorage.setItem("pkce_state", state);
  Config.init({
    app: CLIENT_ID,
    redirectUrl: "http://localhost",
    state: state,
    codeChallenge: codeChallenge,
  });
}
