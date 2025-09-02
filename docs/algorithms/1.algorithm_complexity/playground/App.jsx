export default function App() {
  // 该示例用于演示 playground 的默认目录查找规则
  const inputSizes = [1, 2, 4, 8, 16, 32, 64]
  const stepsLinear = inputSizes.map(n => n) // O(n)
  const stepsLog = inputSizes.map(n => Math.log2(n)) // O(log n)
  const stepsQuad = inputSizes.map(n => n * n) // O(n^2)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <h3>时间复杂度增长趋势（示意）</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px' }}>n</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px' }}>O(log n)</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px' }}>O(n)</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '6px' }}>O(n^2)</th>
          </tr>
        </thead>
        <tbody>
          {inputSizes.map((n, i) => (
            <tr key={n}>
              <td style={{ borderBottom: '1px solid #f0f0f0', padding: '6px' }}>{n}</td>
              <td style={{ borderBottom: '1px solid #f0f0f0', padding: '6px' }}>{stepsLog[i].toFixed(2)}</td>
              <td style={{ borderBottom: '1px solid #f0f0f0', padding: '6px' }}>{stepsLinear[i]}</td>
              <td style={{ borderBottom: '1px solid #f0f0f0', padding: '6px' }}>{stepsQuad[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: '#666', marginTop: 8 }}>说明：仅用于直观展示，不代表真实运行时间。</p>
    </div>
  )
}


