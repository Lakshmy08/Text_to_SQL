import { useState, useEffect } from 'react'
import QueryInput from './components/QueryInput'
import ResultsTable from './components/ResultsTable'
import SQLDisplay from './components/SQLDisplay'
import ChartView from './components/ChartView'
import QueryHistory from './components/QueryHistory'
import { Database } from 'lucide-react'
import axios from 'axios'

const API = 'http://localhost:8000'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const [activeTab, setActiveTab] = useState('table')

  useEffect(() => {
    axios.get(`${API}/history`).then(r => setHistory(r.data))
  }, [])

  const handleQuery = async (question) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { data } = await axios.post(`${API}/query`, { question })
      setResult(data)
      setHistory(prev => [data, ...prev])
      setActiveTab('table')
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleHistorySelect = (entry) => {
    setResult(entry)
    setError(null)
    setActiveTab('table')
  }

  const handleClearHistory = async () => {
    await axios.delete(`${API}/history`)
    setHistory([])
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

      {/* Sidebar */}
      <div style={{
        width: '300px', background: '#1a1d27', borderRight: '1px solid #2d3148',
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #2d3148', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={22} color="#6c63ff" />
          <span style={{ fontWeight: 700, fontSize: '16px' }}>SaaS BI Tool</span>
        </div>
        <QueryHistory
          history={history}
          onSelect={handleHistorySelect}
          onClear={handleClearHistory}
        />
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Query Input */}
        <div style={{ padding: '24px', borderBottom: '1px solid #2d3148', background: '#13151f' }}>
          <QueryInput onSubmit={handleQuery} loading={loading} />
        </div>

        {/* Results Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {error && (
            <div style={{
              background: '#2d1b1b', border: '1px solid #5c2626', borderRadius: '8px',
              padding: '16px', color: '#ff6b6b', marginBottom: '16px'
            }}>
               {error}
            </div>
          )}

          {result && (
            <>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {['table', 'chart', 'sql'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: '8px 20px', borderRadius: '6px', border: 'none',
                    cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                    background: activeTab === tab ? '#6c63ff' : '#1e2133',
                    color: activeTab === tab ? '#fff' : '#8892b0',
                    textTransform: 'capitalize'
                  }}>
                    {tab === 'table' ? `Results (${result.row_count})` : tab === 'chart' ? 'Chart' : 'SQL'}
                  </button>
                ))}
              </div>

              {activeTab === 'table' && <ResultsTable data={result.result} />}
              {activeTab === 'chart' && <ChartView data={result.result} />}
              {activeTab === 'sql' && <SQLDisplay sql={result.sql} question={result.question} />}
            </>
          )}

          {!result && !error && !loading && (
            <div style={{ textAlign: 'center', color: '#4a5068', marginTop: '80px' }}>
              <Database size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <p style={{ fontSize: '18px' }}>Ask a question about your data</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>e.g. "Revenue by quarter" or "Top 5 companies by MRR"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
