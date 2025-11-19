import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { shadeColor } from '../../function/shadeColor';

export const SimpleAreaChart = ({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) => {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  const lighterOne = shadeColor(colorOne, 40);
  const lighterTwo = shadeColor(colorTwo, 40);

  return (
    <div style={{ width: "100%", maxWidth: "350px", margin: "auto", }}>
      <ResponsiveContainer width="100%" aspect={1.4}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0, }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={XAxisKey} ticks={xTicks} />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey={dataKeyOne} stroke={colorOne} fill={lighterOne} />
          <Area type="monotone" dataKey={dataKeyTwo} stroke={colorTwo} fill={lighterTwo} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
