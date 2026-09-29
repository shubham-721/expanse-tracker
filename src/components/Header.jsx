export default function Header({ label, onShift }) {
  return (
    <div className="top">
      <div className="brand">Ledgerline</div>
      <div className="months">
        <button onClick={() => onShift(-1)} aria-label="Previous month">‹</button>
        <span aria-live="polite">{label}</span>
        <button onClick={() => onShift(1)} aria-label="Next month">›</button>
      </div>
    </div>
  )
}
