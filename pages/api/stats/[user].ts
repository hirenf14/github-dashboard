import { withOctokit } from "@helpers/withOctokit";
import { DateTime } from "luxon";
import { get } from "lodash";

const query = `
query Contributions($from: DateTime!, $to: DateTime!, $login: String!) {
	user(login: $login) {
    login
    bio
    avatarUrl
    id
    name
    pronouns
    contributionsCollection(from: $from, to: $to) {
      totalRepositoryContributions
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
	}
}
`;

export default withOctokit(async (req, res, octokit, userId) => {
  const fromTime = DateTime.now().minus({ month: 6 }).toISO();
  const toTime = DateTime.now().toISO();
  const login = req.query.user !== "me" ? req.query.user : userId;
  if (!login) {
    return res.status(500).json({ message: "Invalid User" });
  }
  const {
    user: { contributionsCollection: collection, ...user },
  }: any = await octokit.graphql(query, {
    from: fromTime,
    to: toTime,
    login,
  });
  const contributions = get(collection, "contributionCalendar.weeks", []);
  res.status(200).json({
    ...user,
    repositories: collection.totalRepositoryContributions || 0,
    commits: collection.totalCommitContributions || 0,
    prs: collection.totalPullRequestContributions || 0,
    issues: collection.totalIssueContributions || 0,
    reviews: collection.totalPullRequestReviewContributions || 0,
    contributions,
  });
});
