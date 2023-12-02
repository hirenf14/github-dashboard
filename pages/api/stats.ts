import { withOctokit } from "@helpers/withOctokit";
import { DateTime } from "luxon";
import { get } from "lodash";

const query = `
query Contributions($from: DateTime!, $to: DateTime!) {
	viewer {
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

export default withOctokit(async (_req, res, octokit) => {
  const fromTime = DateTime.now().minus({ month: 6 }).toISO();
  const toTime = DateTime.now().toISO();
  const { viewer }: any = await octokit.graphql(query, {
    from: fromTime,
    to: toTime,
  });
  const collection = get(viewer, "contributionsCollection", {});
  const contributions = get(collection, "contributionCalendar.weeks", []);
  res.status(200).json([
    {
      repositories: collection.totalRepositoryContributions || 0,
      commits: collection.totalCommitContributions || 0,
      prs: collection.totalPullRequestContributions || 0,
      issues: collection.totalIssueContributions || 0,
      reviews: collection.totalPullRequestReviewContributions || 0,
      contributions,
    },
  ]);
});
