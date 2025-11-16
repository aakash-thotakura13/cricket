import { Bar, BarChart, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";

export const SimpleBarChart = ({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) => {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '350px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey={XAxisKey} ticks={xTicks} />
      <YAxis width="auto" />
      <Tooltip />
      <Legend iconSize={7} />
      <Bar
        dataKey={dataKeyOne}
        fill={colorOne}
        activeBar={<Rectangle />}
        />
      <Bar
        dataKey={dataKeyTwo}
        fill={colorTwo}
        activeBar={<Rectangle />}
      />

    </BarChart>
  )
};