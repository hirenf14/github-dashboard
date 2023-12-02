import { ContributionStats } from "@interfaces/contributions";

export interface IFormattedStat {
  type: string;
  counts: number;
}

const statTypes: {
  key: Exclude<keyof ContributionStats, "contributions">;
  label: string;
}[] = [
    { key: "reviews", label: "Code Review" },
    { key: "issues", label: "Issues" },
    { key: "prs", label: "Pull Requests" },
    { key: "commits", label: "Commits" },
];

export const formatContributionStats = (
  history?: ContributionStats
): IFormattedStat[] => {
  return statTypes.map((stat) => ({
    type: stat.label,
    counts: history ? history[stat.key] : 0,
  }));
};
