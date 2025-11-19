const ChartGradients = ({ colorOne, colorTwo }) => (
  <defs>
    <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorOne} stopOpacity={0.9} />
      <stop offset="95%" stopColor={colorOne} stopOpacity={0.2} />
    </linearGradient>

    <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorTwo} stopOpacity={0.9} />
      <stop offset="95%" stopColor={colorTwo} stopOpacity={0.2} />
    </linearGradient>
  </defs>
);


export default ChartGradients