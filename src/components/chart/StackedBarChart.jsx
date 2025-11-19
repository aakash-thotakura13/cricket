import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const StackedBarChart = ({ data }) => {

  const xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const yTicks = [0, 6, 12, 18, 24, 30, 36, 42];

  const WicketDot = (props) => {
    const { x, y, width, height } = props;
    const cx = x + width / 2;
    const cy = y + height / 2;
    const r = Math.min(width, height) / 2;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="url(#wicketGradient)"
        stroke="#b30000"
        strokeWidth={1.5}
      />
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '350px', maxHeight: '70vh', aspectRatio: 1.618 }}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5, }}
        >
          <defs>
            {/* 🔴 Wicket Gradient */}
            <linearGradient id="wicketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d4d" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#ff0000" stopOpacity={0.8} />
            </linearGradient>

            {/* 🔵 Runs Gradient */}
            <linearGradient id="runsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#74c0fc" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#1a73e8" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis dataKey="name" ticks={xTicks} type='number' />;
          <YAxis ticks={yTicks} type='number' />
          <Tooltip />

          {/* <Legend /> */}
          <Bar
            dataKey="runs"
            stackId="a"
            fill="url(#runsGradient)"
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
          <Bar dataKey="wicket1" stackId="a" shape={<WicketDot />} />
          <Bar dataKey="wicket2" stackId="a" shape={<WicketDot />} />
          <Bar dataKey="wicket3" stackId="a" shape={<WicketDot />} />
          <Bar dataKey="wicket4" stackId="a" shape={<WicketDot />} />
          <Bar dataKey="wicket5" stackId="a" shape={<WicketDot />} />
          <Bar dataKey="wicket6" stackId="a" shape={<WicketDot />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
