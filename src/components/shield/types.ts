export const shieldTypes = {
  topLanguage: ({ user, repo }: { user: string; repo: string }) =>
    `https://img.shields.io/github/languages/top/${user}/${repo}`,
  languageCount: ({ user, repo }: { user: string; repo: string }) =>
    `https://img.shields.io/github/languages/count/${user}/${repo}`,
  static: ({ label, color = "blue" }: { label: string; color?: string }) =>
    `https://img.shields.io/badge/${label}-${color}`,
};

type ShieldTypes = typeof shieldTypes;

export type ShieldVariant = keyof ShieldTypes;
export type ShieldProps<T extends ShieldVariant> = Parameters<
  ShieldTypes[T]
>[0];
