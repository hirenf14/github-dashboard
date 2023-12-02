import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Octokit } from "octokit";

export const withOctokit = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    octokit: Octokit,
    login?: string
  ) => Promise<void>
) => {
  return async function (req: NextApiRequest, res: NextApiResponse<any>) {
    const token = await getToken({
      req,
    });
    const octokit = new Octokit({ auth: token!.accessToken });
    return await handler(req, res, octokit, token?.sub);
  };
};
