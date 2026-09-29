import { CATS } from '../constants.js'
import { money } from '../utils.js'

function groupByDate(items) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
  const groups = []
  sorted.forEach((i) => {
    const last = groups[groups.length - 1]
    if (last && last.date === i.date) last.list.push(i)
    else groups.push({ date: i.date, list: [i] })
  })
  return groups
}

const dayLabel = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function ExpenseList({ items, filter, monthHasItems, onRemove }) {
  const groups = groupByDate(items)
  return (
    <>
      <h2>{filter ? `${filter} expenses` : 'All expenses'}</h2>
      {groups.length === 0 && (
        <p className="empty">
          {monthHasItems ? 'Nothing in this category yet.' : 'No expenses in this month. Add one to get started.'}
        </p>
      )}
      {groups.map((g) => (
        <div key={g.date}>
          <div className="day">
            <span>{dayLabel(g.date)}</span>
            <span>{money(g.list.reduce((s, i) => s + i.amt, 0))}</span>
          </div>
          {g.list.map((i) => (
            <div className="row" key={i.id}>
              <span className="sw" style={{ background: CATS[i.cat] }} />
              <div className="n">
                <div>{i.note}</div>
                <small>{i.cat}</small>
              </div>
              <button className="rm" onClick={() => onRemove(i.id)} aria-label={`Remove ${i.note}`}>Remove</button>
              <span className="amt">{money(i.amt)}</span>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
