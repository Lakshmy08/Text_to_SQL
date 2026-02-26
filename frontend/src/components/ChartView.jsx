import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

export default function ChartView({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ color: '#4a5068', textAlign: 'center', padding: '40px' }}>No data to chart.</div>
  )

  const cols = Object.keys(data[0])
  const numericCols = cols.filter(c => typeof data[0][c] === 'number')
  const labelCol = cols.find(c => typeof data[0][c] === 'string') || cols[0]

  if (numericCols.length === 0) return (
    <div style={{ color: '#4a5068', textAlign: 'center', padding: '40px' }}>No numeric columns to chart.</div>
  )

  const COLORS = ['#6c63ff', '#a8ff78', '#ff6b6b', '#ffd93d', '#4ecdc4']

  const isTimeSeries = labelCol.toLowerCase().includes('date') ||
    labelCol.toLowerCase().includes('month') ||
    labelCol.toLowerCase().includes('quarter') ||
    labelCol.toLowerCase().includes('year')

  const Chart = isTimeSeries ? LineChart : BarChart
  const Series = isTimeSeries ? Line : Bar

  return (
    <div style={{ background: '#1e2133', borderRadius: '8px', padding: '24px', border: '1px solid #2d3148' }}>
      <ResponsiveContainer width="100%" height={380}>
        <Chart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3148" />
          <XAxis
            dataKey={labelCol}
            tick={{ fill: '#8892b0', fontSize: 12 }}
            angle={-35}
            textAnchor="end"
          />
          <YAxis tick={{ fill: '#8892b0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#1a1d27', border: '1px solid #2d3148', borderRadius: '6px' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend wrapperStyle={{ color: '#8892b0', paddingTop: '20px' }} />
          {numericCols.map((col, i) => (
            <Series
              key={col}
              type="monotone"
              dataKey={col}
              fill={COLORS[i % COLORS.length]}
              stroke={COLORS[i % COLORS.length]}
              dot={false}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}