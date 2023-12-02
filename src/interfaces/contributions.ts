export interface GithubUser {
  login: string;
  bio: string;
  avatarUrl: string;
  id: string;
  name: string;
  pronouns: string;
}

export interface UserWithStats extends GithubUser, ContributionStats {}

export interface ContributionStats {
  repositories: number;
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
  contributions: ContributionWeek[];
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}
