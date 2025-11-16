import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export const SimpleAreaChart = ({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) => {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <AreaChart
      style={{ width: '100%', maxWidth: '350px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey={XAxisKey} ticks={xTicks} />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey={dataKeyOne} stroke={colorOne} fill={colorOne} />
      <Area type="monotone" dataKey={dataKeyTwo} stroke={colorTwo} fill={colorTwo} />
    </AreaChart>
  );
};
