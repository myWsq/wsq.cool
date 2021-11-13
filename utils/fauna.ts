import { Client, query } from "faunadb";

export const SECRET_TOKEN_KEY = "FAUNA_ADMIN_KEY";

export function createFaunaClient(secret?: string) {
  if (!secret) {
    if (process.browser) {
      secret = localStorage.getItem(SECRET_TOKEN_KEY) || "";
    } else {
      secret = process.env[SECRET_TOKEN_KEY];
    }
  }

  if (!secret) {
    throw new Error("Fauna secret key not found");
  }

  const client = new Client({
    secret,
  });
  return {
    client,
    q: query,
  };
}
