import { ContributionWeek } from "@interfaces/contributions";
import { DateTime } from "luxon";

export interface IFormattedHistory extends Record<number, number> {
  date: number;
  contributions: number;
}

export const formatHistory = (
  history: ContributionWeek[]
): IFormattedHistory[] => {
  return history.map((week) => {
    const date = week.contributionDays[0].date;
    const weekly = week.contributionDays.reduce(
      (a, c) => {
        return {
          ...a,
          contributions: a.contributions + c.contributionCount,
          [c.weekday]: c.contributionCount,
        };
      },
      { contributions: 0 }
    );

    return {
      date: DateTime.fromISO(date).valueOf(),
      ...weekly,
    };
  });
};
