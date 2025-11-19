import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";
import { chartColors } from "../../chartColors";
import ChartGradients from "./ChartGradients";

export const SimpleLineChart = ({
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
        <LineChart data={data} margin={{ top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey={xAxisKey} ticks={ticks} allowDecimals={false} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />

          <Line
            type="monotone"
            dataKey={dataKeyOne}
            stroke={chartColors.one}
            strokeWidth={2.4}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey={dataKeyTwo}
            stroke={chartColors.two}
            strokeWidth={2.4}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
