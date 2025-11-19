import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";
import { chartColors } from "../../chartColors";
import ChartGradients from "./ChartGradients";

export const SimpleBarChart = ({
  data,
  dataKeyOne,
  dataKeyTwo,
  xAxisKey,
  title,
}) => {

  // Get dynamic ticks
  const overs = data?.map(d => d[xAxisKey]) || [];
  const min = Math.min(...overs);
  const max = Math.max(...overs);
  const step = Math.ceil((max - min) / 10) || 1;
  const ticks = [];

  for (let i = min; i <= max; i += step) ticks.push(i);

  return (
    <div style={{ width: "100%", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h3>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={data} margin={{ top: 10, bottom: 10 }}>

          <ChartGradients colorOne={chartColors.one} colorTwo={chartColors.two} />

          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey={xAxisKey} ticks={ticks} allowDecimals={false} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          <Bar dataKey={dataKeyOne} fill={chartColors.oneGradient} radius={[4, 4, 0, 0]} />
          <Bar dataKey={dataKeyTwo} fill={chartColors.twoGradient} radius={[4, 4, 0, 0]} />

        </BarChart>

      </ResponsiveContainer>
    </div>
  );
};
