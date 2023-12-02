import { DateTime } from "luxon";
import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { ChartToolTip } from "./ChartToolTip";
import { IFormattedHistory } from "@helpers/formatHistory";

interface ICommitHistoryChartProps {
  history: IFormattedHistory[];
}

const xTickFormatter = (value: number) =>
  DateTime.fromMillis(value).toFormat("LLL yy");

export const CommitHistoryChart: React.FunctionComponent<
  ICommitHistoryChartProps
> = ({ history: data }) => {
  const domain = data.length
    ? [data[0].date, data[data.length - 1].date]
    : undefined;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} syncId="date">
        <XAxis
          dataKey="date"
          type="number"
          domain={domain}
          tickCount={7}
          tickFormatter={xTickFormatter}
        />
        <YAxis type="number" />
        <Tooltip
          content={(props) => (
            <ChartToolTip
              labelFormatter={(v) => xTickFormatter(v)}
              {...props}
            />
          )}
        />
        <Legend />
        <Area
          dataKey="contributions"
          name="Contributions"
          stroke="#40c463"
          fill="#40c463"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
