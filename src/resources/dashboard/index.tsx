import { Box, Grid, GridItem } from "@chakra-ui/react";
import { MemeCard } from "@components/meme-card";
import { temp } from "@config/temp";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import React, { useMemo } from "react";
import { CommitHistoryChart } from "@components/charts";
import { DashboardCard } from "@components/cards";
import { formatHistory } from "@helpers/formatHistory";
import { ContributionWeek } from "@interfaces/contributions";

export const Dashboard: React.FC<IResourceComponentsProps> = () => {
  const { data } = useList<ContributionWeek>({ resource: "stats" });
  const history = useMemo(() => {
    return formatHistory(data?.data || []);
  }, [data]);
  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={7}>
        <DashboardCard title="Contributions last 6 months">
          <Box height={400}>
            <CommitHistoryChart history={history} />
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
