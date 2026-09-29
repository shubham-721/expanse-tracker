import { useState } from 'react'
import { CATS } from '../constants.js'
import { money } from '../utils.js'

export default function Summary({ label, total, budget, setBudget, elapsed, byCat, filter, setFilter }) {
  const [editing, setEditing] = useState(false)
  const scale = Math.max(budget, total) || 1
  const left = budget - total
  const toggle = (c) => setFilter(filter === c ? null : c)

  const commitBudget = (e) => {
    const v = parseFloat(e.target.value)
    if (v > 0) setBudget(v)
    setEditing(false)
  }

  return (
    <section className="hero">
      <h1 className="big">{money(total)}</h1>
      <p className="sub">
        Spent in {label}, about <b>{money(total / elapsed)}</b> a day.{' '}
        {left >= 0 ? (
          <><b>{money(left)}</b> left of </>
        ) : (
          <><b>{money(-left)}</b> over </>
        )}
        the{' '}
        {editing ? (
          <input
            className="f"
            type="number"
            autoFocus
            defaultValue={budget}
            aria-label="Monthly budget"
            onBlur={commitBudget}
            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
          />
        ) : (
          <button className="bud" onClick={() => setEditing(true)} title="Change budget">
            {money(budget)}
          </button>
        )}{' '}
        budget.
      </p>

      <div className="barwrap">
        <div className="bar" role="img" aria-label="Spending by category">
          {byCat.map(({ c, v }) => (
            <button
              key={c}
              className={'seg' + (filter && filter !== c ? ' dim' : '')}
              tabIndex={-1}
              style={{ width: (v / scale) * 100 + '%', background: CATS[c] }}
              onClick={() => toggle(c)}
              aria-label={c}
            />
          ))}
        </div>
        {total > budget && <div className="mark" style={{ left: (budget / scale) * 100 + '%' }} title="Budget limit" />}
      </div>

      <div className="legend">
        {byCat.map(({ c, v }) => (
          <button key={c} className="chip" aria-pressed={filter === c} onClick={() => toggle(c)}>
            <i style={{ background: CATS[c] }} />
            {c}
            <em>{money(v)}</em>
          </button>
        ))}
      </div>
    </section>
  )
}
