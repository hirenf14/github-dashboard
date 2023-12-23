import { withOctokit } from "@helpers/withOctokit";
import { pick } from "lodash";

const selection = [
  "id",
  "full_name",
  "name",
  "owner.login",
  "owner.avatar_url",
  "visibility",
  "description",
  "fork",
  "git_url",
  "ssh_url",
  "clone_url",
  "svn_url",
  "license",
  "created_at",
  "updated_at",
  "pushed_at",
  "stargazers_count",
  "watchers_count",
  "language",
  "forks_count",
  "open_issues_count",
  "topics",
  "forks",
  "open_issues",
  "watchers",
  "default_branch",
  "network_count",
  "subscribers_count",
];
export default withOctokit(async (req, res, octokit) => {
  const { owner, repo } = req.query;
  if (!owner || !repo) {
    return res.status(500).json({ message: "Incorrect Repository." });
  }

  const response = await octokit.rest.repos.get({
    owner: owner as string,
    repo: repo as string,
  });
  return res.status(200).json(pick(response.data, selection));
});
