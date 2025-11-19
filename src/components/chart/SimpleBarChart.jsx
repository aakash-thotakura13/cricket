import { Bar, BarChart, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { shadeColor } from "../../function/shadeColor";

export const SimpleBarChart = ({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) => {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    const lighterOne = shadeColor(colorOne, 40);
    const lighterTwo = shadeColor(colorTwo, 40);

  return (
    <div style={{ width: "100%", maxWidth: "350px", margin: "auto", }}>
      <ResponsiveContainer width="100%" aspect={1.4}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5, }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={XAxisKey} ticks={xTicks} />
          <YAxis width="auto" />
          <Tooltip />
          <Legend iconSize={7} />

          <Bar dataKey={dataKeyOne} fill={lighterOne} activeBar={<Rectangle stroke={colorOne} strokeWidth={2} />} />
          <Bar dataKey={dataKeyTwo} fill={lighterTwo} activeBar={<Rectangle stroke={colorTwo} strokeWidth={2} />} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};