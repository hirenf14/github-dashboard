import { paginateResponse, getTotalPages } from "@helpers/pagination";
import { withOctokit } from "@helpers/withOctokit";
import { pick } from "lodash";

const selection = [
  "id",
  "full_name",
  "name",
  "owner.login",
  "owner.avatar_url",
  "visibility",
];
export default withOctokit(async (req, res, octokit) => {
  const params = req.query;
  const start = typeof params._start === "string" ? parseInt(params._start) : 0;
  const end = typeof params._end === "string" ? parseInt(params._end) : 10;
  const limit = end - start;
  const response = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: limit,
    page: end / limit,
  });
  const lastPage = getTotalPages(response.headers.link!) || "1";
  return paginateResponse(
    res,
    response.data.map((d) => pick(d, selection)),
    parseInt(lastPage) * limit
  );
});
