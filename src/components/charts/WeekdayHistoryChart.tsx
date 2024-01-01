import { IFormattedHistory } from "@helpers/formatHistory";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import { ChartToolTip } from "./ChartToolTip";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#9b59b6",
  "#e74c3c",
  "#1afc5c",
];

interface IWeekdayHistoryChartProps {
  data: IFormattedHistory[];
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const WeekdayHistoryChart: React.FunctionComponent<
  IWeekdayHistoryChartProps
> = ({ data }) => {
  const summary = useMemo(() => {
    return Array(7)
      .fill(0)
      .map((_d, index) => ({
        name: DateTime.fromFormat(String(index + 1), "c").toFormat("cccc"),
        value: data.reduce((a, c) => a + (c[index] || 0), 0),
      }));
  }, [data]);
  console.log("summary", summary);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={summary}
          activeIndex={activeIndex}
          innerRadius={60}
          outerRadius={80}
          activeShape={renderActiveShape}
          fill="#8884d8"
          label
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {summary.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip content={ChartToolTip} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default WeekdayHistoryChart;
