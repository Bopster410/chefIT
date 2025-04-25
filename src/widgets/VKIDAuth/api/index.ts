import { Config, ConfigResponseMode } from "@vkid/sdk";
import { CLIENT_ID } from "./index.constants";
import { generateRandomString } from "@/shared/api";

export async function initVKSDK() {
  const codeChallenge = "DkaKPL9Mzlp5n6SYrOkkgBoBbK2JahDgQlg4nqQVfx0"
  const state = generateRandomString(16);

  sessionStorage.setItem("pkce_state", state);
  Config.init({
    app: CLIENT_ID,
    redirectUrl: "https://www.chef-it.online",
    state: state,
    codeChallenge: codeChallenge,
    responseMode: ConfigResponseMode.Callback,
  });
}
