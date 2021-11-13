import { Client, query } from "faunadb";

export function createFaunaClient() {
  const secret = process.env.FAUNA_ADMIN_KEY;
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
