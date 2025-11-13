import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

export const SimpleBarChart = ({data}) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
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
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="blue" stroke="" />} />
      {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="" />} /> */}
    </BarChart>
  )
};