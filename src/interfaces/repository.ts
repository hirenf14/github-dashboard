export interface RepositoryInfo {
  id: number;
  name: string;
  full_name: string;
  owner: RepostioryOwner;
  description: string;
  visibility: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: any;
}

export interface RepositoryStats {
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
  network_count: number;
  subscribers_count: number;
}

export interface Repository
  extends RepositoryInfo,
    RepositoryStats,
    RepositoryUrls {
  private: boolean;
  archived: boolean;
  disabled: boolean;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: any[];
  default_branch: string;
  temp_clone_token: string;
}

interface RepositoryUrls {
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  mirror_url: any;
}

export interface RepostioryOwner {
  login: string;
  avatar_url: string;
  type: string;
}
