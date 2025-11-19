import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function SimpleLineChart({ data, dataKeyOne, dataKeyTwo, XAxisKey, colorOne, colorTwo }) {

  const xTicks = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div style={{ width: "100%", maxWidth: "350px", margin: "auto", }}>
      <ResponsiveContainer width="100%" aspect={1.4}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 0, left: 0, bottom: 5, }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey={XAxisKey} ticks={xTicks} />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey={dataKeyOne} stroke={colorOne} dot={false} />
          <Line type="linear" dataKey={dataKeyTwo} stroke={colorTwo} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};