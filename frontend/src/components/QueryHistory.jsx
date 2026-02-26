import { Trash2, Clock } from 'lucide-react'

export default function QueryHistory({ history, onSelect, onClear }) {
  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '14px 20px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: '1px solid #2d3148'
      }}>
        <span style={{ fontSize: '12px', color: '#4a5068', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          History ({history.length})
        </span>
        {history.length > 0 && (
          <button onClick={onClear} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#4a5068'
          }}>
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div style={{ overflowY: 'auto', flex: 1 }}>
        {history.length === 0 && (
          <p style={{ color: '#4a5068', fontSize: '13px', padding: '20px', textAlign: 'center' }}>
            No queries yet
          </p>
        )}
        {history.map(entry => (
          <div
            key={entry.id}
            onClick={() => onSelect(entry)}
            style={{
              padding: '14px 20px', borderBottom: '1px solid #1e2133',
              cursor: 'pointer', transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1e2133'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <p style={{ fontSize: '13px', color: '#c8d0e0', marginBottom: '6px', lineHeight: '1.4' }}>
              {entry.question}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4a5068', fontSize: '11px' }}>
              <Clock size={11} />
              {new Date(entry.timestamp).toLocaleTimeString()} · {entry.row_count} rows
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}