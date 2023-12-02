import { Box, Grid, GridItem } from "@chakra-ui/react";
import { MemeCard } from "@components/meme-card";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import React, { useMemo } from "react";
import { CommitHistoryChart } from "@components/charts";
import { DashboardCard } from "@components/cards";
import { formatHistory } from "@helpers/formatHistory";
import { ContributionStats } from "@interfaces/contributions";
import { formatContributionStats } from "@helpers/formatContributionStats";
import { ActivityOverviewChart } from "@components/charts";
import WeekdayHistoryChart from "@components/charts/WeekdayHistoryChart";

export const Dashboard: React.FC<IResourceComponentsProps> = () => {
  const { data } = useList<ContributionStats>({ resource: "stats" });
  const stats = useMemo(() => {
    return formatContributionStats(data?.data[0]);
  }, [data]);
  const history = useMemo(() => {
    return formatHistory(data?.data[0].contributions || []);
  }, [data]);
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={6}>
        <DashboardCard title="Contributions last 6 months">
          <Box height={300}>
            <CommitHistoryChart history={history} />
          </Box>
        </DashboardCard>
      </GridItem>
      <GridItem colSpan={3}>
        <DashboardCard title="Activity Overview">
          <Box height={300}>
            <ActivityOverviewChart data={stats} />
          </Box>
        </DashboardCard>
      </GridItem>
      <GridItem colSpan={3}>
        <DashboardCard title="Working Weekdays">
          <Box height={300}>
            <WeekdayHistoryChart data={history} />
          </Box>
        </DashboardCard>
      </GridItem>
      <GridItem colSpan={5}>
        <DashboardCard title="Random Meme">
          <MemeCard maxH={400} m="auto" objectFit="contain" />
        </DashboardCard>
      </GridItem>
    </Grid>
  );
};
