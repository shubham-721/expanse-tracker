export default function DailyChart({ daily }) {
  const max = Math.max(...daily, 1)
  return (
    <>
      <h2>Spend by day</h2>
      <svg className="daily" viewBox={`0 0 ${daily.length * 10} 56`} preserveAspectRatio="none" role="img" aria-label="Daily spending">
        {daily.map((v, i) => {
          const h = Math.max(v ? 3 : 1, (v / max) * 56)
          return <rect key={i} x={i * 10 + 1} width="8" rx="1" y={56 - h} height={h} fill={v ? 'var(--ink)' : 'var(--line)'} />
        })}
      </svg>
    </>
  )
}
