import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export function SimpleLineChart({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <LineChart
      style={{ width: '100%', maxWidth: '350px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
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
      <Legend />
      <Line type="linear" dataKey={dataKeyOne} stroke={colorOne} dot={false} />
      <Line type="linear" dataKey={dataKeyTwo} stroke={colorTwo} dot={false} />
    </LineChart>
  );
}