import { PieChart, Pie, Tooltip, Cell } from "recharts";

export function StraightAnglePieChart({ data }) {
  const COLORS = ['#e7c25bff', '#b4a889ff'];

  return (
    <PieChart style={{ width: '100%', maxWidth: '500px', aspectRatio: 2 }}>

      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        innerRadius="60%"
        label={({ name }) => name}
        isAnimationActive
        stroke="none"
        strokeWidth={0}
      >

        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}

      </Pie>

      <Tooltip formatter={(value, name, props) => [props.value]} />

    </PieChart>
  );
};