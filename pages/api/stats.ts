import { withOctokit } from "@helpers/withOctokit";
import { DateTime } from "luxon";
import { get } from "lodash";

const query = `
query Contributions($from: DateTime!, $to: DateTime!) {
	viewer {
		contributionsCollection(from: $from, to: $to) {
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
		to: toTime
	});
	const calendar = get(viewer, "contributionsCollection.contributionCalendar");
	const contributions = get(calendar, "weeks", []);
	res.status(200).json(contributions);
});
