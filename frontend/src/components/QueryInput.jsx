import { useState } from 'react'
import { Search, Loader } from 'lucide-react'

export default function QueryInput({ onSubmit, loading }) {
  const [value, setValue] = useState('')

  const handle = () => {
    if (value.trim() && !loading) {
      onSubmit(value.trim())
    }
  }

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <Search size={18} style={{
          position: 'absolute', left: '14px', top: '50%',
          transform: 'translateY(-50%)', color: '#4a5068'
        }} />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handle()}
          placeholder="Ask anything about your data..."
          style={{
            width: '100%', padding: '12px 16px 12px 44px',
            background: '#1e2133', border: '1px solid #2d3148',
            borderRadius: '8px', color: '#e2e8f0', fontSize: '15px',
            outline: 'none'
          }}
        />
      </div>
      <button
        onClick={handle}
        disabled={loading || !value.trim()}
        style={{
          padding: '12px 24px', background: loading ? '#3d3580' : '#6c63ff',
          border: 'none', borderRadius: '8px', color: '#fff',
          fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
        }}
      >
        {loading ? <><Loader size={16} className="spin" /> Running...</> : 'Run Query'}
      </button>
    </div>
  )
}