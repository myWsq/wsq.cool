// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createFaunaClient } from "../../utils/fauna";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 处理登录请求
  if (req.method === "POST") {
    if (
      req.body.username + ":" + req.body.password ===
      process.env.ADMIN_AUTH_TOKEN
    ) {
      res.status(200).json({ secretToken: process.env.FAUNA_ADMIN_KEY || "" });
    } else {
      res.status(401).end();
    }
  }
  // 验证 token
  else if (req.method === "GET") {
    const secretToken = req.headers.authorization;
    if (!secretToken) {
      res.status(401).end();
    } else {
      const { client } = createFaunaClient(secretToken);
      await client.ping();
      res.status(200).end();
    }
  }
}
