import { IFormattedStat } from "@helpers/formatContributionStats";
import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartToolTip } from "./ChartToolTip";

interface IActivityOverviewChartProps {
  data: IFormattedStat[];
}

export const ActivityOverviewChart: React.FunctionComponent<
  IActivityOverviewChartProps
> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart
        data={data}
        margin={{
          left: 50,
          right: 50,
        }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="type" />
        <PolarRadiusAxis axisLine={false} />
        <Tooltip content={ChartToolTip} />
        <Radar
          name="Contributions"
          dataKey="counts"
          stroke="#40c463"
          fill="#40c463"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
