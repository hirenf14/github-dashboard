import {
  Flex,
  Grid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { DashboardCard } from "@components/cards";
import { ContributionStats } from "@interfaces/contributions";
import React from "react";
import { IconBrandGit, IconGitCommit, IconGitPullRequest } from "@tabler/icons";

interface IDashboardStatsProps {
  stats: ContributionStats;
  dateRange: string;
}

const StatCard: React.FC<{
  label: string;
  stat: number;
  helpText?: string;
  icon?: React.ReactNode;
}> = ({ label, stat, helpText, icon }) => {
  return (
    <DashboardCard p={2}>
      <Flex gap={4} align="center">
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{stat}</StatNumber>
          <StatHelpText>{helpText}</StatHelpText>
        </Stat>
        {icon}
      </Flex>
    </DashboardCard>
  );
};

export const DashboardStats: React.FunctionComponent<IDashboardStatsProps> = ({
  stats,
  dateRange,
}) => {
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={4}>
      <StatCard
        label="Repositories"
        stat={stats.repositories}
        helpText={dateRange}
        icon={<IconBrandGit />}
      />
      <StatCard
        label="Commits"
        stat={stats.commits}
        helpText={dateRange}
        icon={<IconGitCommit />}
      />
      <StatCard
        label="Pull Requests"
        stat={stats.prs}
        helpText={dateRange}
        icon={<IconGitPullRequest />}
      />
    </Grid>
  );
};
