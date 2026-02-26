import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function SQLDisplay({ sql, question }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(sql)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ background: '#1e2133', borderRadius: '8px', padding: '16px', border: '1px solid #2d3148' }}>
        <p style={{ color: '#4a5068', fontSize: '12px', marginBottom: '8px' }}>QUESTION</p>
        <p style={{ color: '#e2e8f0' }}>{question}</p>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          background: '#1a1d27', borderRadius: '8px', padding: '20px',
          border: '1px solid #2d3148', fontFamily: 'monospace',
          fontSize: '13px', color: '#a8ff78', lineHeight: '1.6',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word'
        }}>
          {sql}
        </div>
        <button onClick={copy} style={{
          position: 'absolute', top: '12px', right: '12px',
          background: '#2d3148', border: 'none', borderRadius: '6px',
          padding: '6px 10px', cursor: 'pointer', color: '#e2e8f0',
          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'
        }}>
          {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
    </div>
  )
}