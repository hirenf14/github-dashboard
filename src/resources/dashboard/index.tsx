import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { MemeCard } from "@components/meme-card";
import { IResourceComponentsProps, useOne } from "@refinedev/core";
import React, { useMemo } from "react";
import { CommitHistoryChart } from "@components/charts";
import { DashboardCard } from "@components/cards";
import { formatHistory } from "@helpers/formatHistory";
import { UserWithStats } from "@interfaces/contributions";
import { formatContributionStats } from "@helpers/formatContributionStats";
import { ActivityOverviewChart } from "@components/charts";
import WeekdayHistoryChart from "@components/charts/WeekdayHistoryChart";
import { DashboardStats } from "./dashboard-stats";
import { UserInfo } from "@components/user-info";

export const Dashboard: React.FC<IResourceComponentsProps> = () => {
  const { data } = useOne<UserWithStats>({ resource: "stats", id: "me" });
  const stats = useMemo(() => {
    return formatContributionStats(data?.data);
  }, [data]);
  const history = useMemo(() => {
    return formatHistory(data?.data.contributions || []);
  }, [data]);
  const dateRange = "Last 6 months";
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={3}>
        <UserInfo user={data?.data} />
      </GridItem>
      <GridItem colSpan={9}>
        <Stack gap={4}>
          <DashboardStats stats={data?.data} dateRange={dateRange} />
          <Grid gap={4} gridTemplateColumns="repeat(12, 1fr)">
            <GridItem colSpan={5}>
        <DashboardCard
          title="Activity Overview"
          actions={
            <Text fontSize="sm" opacity={0.7}>
              {dateRange}
            </Text>
          }
        >
          <Box height={300}>
            <ActivityOverviewChart data={stats} />
          </Box>
        </DashboardCard>
      </GridItem>
            <GridItem colSpan={7}>
              <DashboardCard
                title="Contributions"
                actions={
                  <Text fontSize="sm" opacity={0.7}>
                    {dateRange}
                  </Text>
                }
              >
                <Box height={300}>
                  <CommitHistoryChart history={history} />
                </Box>
              </DashboardCard>
            </GridItem>
            <GridItem colSpan={5}>
        <DashboardCard
          title="Working Weekdays"
          actions={
            <Text fontSize="sm" opacity={0.7}>
              {dateRange}
            </Text>
          }
        >
          <Box height={300}>
            <WeekdayHistoryChart data={history} />
          </Box>
        </DashboardCard>
      </GridItem>
            <GridItem colSpan={7}>
              <MemeCard />
            </GridItem>
          </Grid>
        </Stack>
      </GridItem>
    </Grid>
  );
};
