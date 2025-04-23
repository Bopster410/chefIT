export function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const result = Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => charset[x % charset.length])
    .join("");
  return result;
}

export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const base64url = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64url;
  }