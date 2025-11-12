
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

export const SimpleBarChart = () => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data2}
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

export const StackedBarChart = ({ data }) => {

  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const yTicks = [5, 10, 15, 20, 25, 30, 35, 40];

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '350px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" ticks={xTicks} type='number' />;
      <YAxis width="auto" ticks={yTicks} type='number' />
      <Tooltip />
      
      {/* <Legend /> */}
      <Bar dataKey="runs" stackId="a" fill="#65a0d8ff" background={false} radius={5} />
      <Bar dataKey="wicket1" stackId="a" fill="#fd0000ff" background={false} radius={20} maxBarSize={15} />
      <Bar dataKey="wicket2" stackId="a" fill="#fd0000ff" background={false} radius={20} />
      <Bar dataKey="wicket3" stackId="a" fill="#fd0000ff" background={false} radius={20} />
      <Bar dataKey="wicket4" stackId="a" fill="#fd0000ff" background={false} radius={20} />
      <Bar dataKey="wicket5" stackId="a" fill="#fd0000ff" background={false} radius={20} />
      <Bar dataKey="wicket6" stackId="a" fill="#fd0000ff" background={false} radius={20} />
    </BarChart>
  );
};