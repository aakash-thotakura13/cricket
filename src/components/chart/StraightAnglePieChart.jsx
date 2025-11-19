import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export function StraightAnglePieChart({ data }) {

  // Custom inner label renderer
  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.72; // Pull label inward
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="600"
      >
        {name}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <ResponsiveContainer width="100%" aspect={1.4}>
        <PieChart>

          <defs>
            {/* Gold gradient */}
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7d774" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#d8a928" stopOpacity={0.9} />
            </linearGradient>

            {/* Silver gradient */}
            <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfcfcf" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#8e8e8e" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            innerRadius="60%"
            stroke="none"
            label={renderCustomLabel}
            labelLine={false}
            isAnimationActive
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={index % 2 === 0 ? "url(#goldGradient)" : "url(#silverGradient)"}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "#ffffffdd",
              border: "1px solid #ddd"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
