import {
  AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";
import { chartColors } from "../../chartColors";
import ChartGradients from "./ChartGradients";

export const SimpleAreaChart = ({
  data,
  dataKeyOne,
  dataKeyTwo,
  xAxisKey,
  title,
}) => {

  const overs = data?.map(d => d[xAxisKey]);
  const min = Math.min(...overs);
  const max = Math.max(...overs);
  const step = Math.ceil((max - min) / 10) || 1;

  const ticks = [];
  for (let i = min; i <= max; i += step) ticks.push(i);

  return (
    <div style={{ width: "100%", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h3>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <ChartGradients colorOne={chartColors.one} colorTwo={chartColors.two} />

          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey={xAxisKey} ticks={ticks} allowDecimals={false} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          <Area type="monotone" dataKey={dataKeyOne} stroke={chartColors.one} fill="url(#colorOne)" />
          <Area type="monotone" dataKey={dataKeyTwo} stroke={chartColors.two} fill="url(#colorTwo)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
