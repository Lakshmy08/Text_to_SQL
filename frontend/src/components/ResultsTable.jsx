export default function ResultsTable({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ color: '#4a5068', textAlign: 'center', padding: '40px' }}>No results returned.</div>
  )

  const cols = Object.keys(data[0])

  return (
    <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #2d3148' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: '#1e2133' }}>
            {cols.map(col => (
              <th key={col} style={{
                padding: '12px 16px', textAlign: 'left',
                color: '#6c63ff', fontWeight: 600, borderBottom: '1px solid #2d3148',
                whiteSpace: 'nowrap'
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#13151f' : '#161824' }}>
              {cols.map(col => (
                <td key={col} style={{
                  padding: '10px 16px', borderBottom: '1px solid #1e2133',
                  color: '#c8d0e0', whiteSpace: 'nowrap'
                }}>
                  {row[col] === null ? <span style={{ color: '#4a5068' }}>NULL</span> : String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}