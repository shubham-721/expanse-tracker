import { useState } from 'react'
import { CATS } from '../constants.js'
import { TODAY } from '../utils.js'

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ amt: '', note: '', cat: 'Food', date: TODAY })
  const [err, setErr] = useState('')
  const set = (patch) => setForm({ ...form, ...patch })

  const submit = (e) => {
    e.preventDefault()
    const amt = parseFloat(form.amt)
    if (!(amt > 0)) return setErr('Enter an amount greater than zero.')
    if (!form.date) return setErr('Pick a date for this expense.')
    setErr('')
    onAdd({ amt, date: form.date, cat: form.cat, note: form.note.trim() || form.cat })
    set({ amt: '', note: '' })
  }

  return (
    <form onSubmit={submit} noValidate>
      <h2>Add expense</h2>

      <label htmlFor="amt">Amount</label>
      <div className="money">
        <span>₹</span>
        <input id="amt" className="f" type="number" inputMode="decimal" min="0" step="any"
          value={form.amt} onChange={(e) => set({ amt: e.target.value })} placeholder="0" />
      </div>

      <label htmlFor="note">What was it for?</label>
      <input id="note" className="f" value={form.note} onChange={(e) => set({ note: e.target.value })} placeholder="Optional" />

      <div className="lab" id="catlab">Category</div>
      <div className="cats" role="radiogroup" aria-labelledby="catlab">
        {Object.keys(CATS).map((c) => (
          <button type="button" key={c} role="radio" aria-checked={form.cat === c} className="cat" onClick={() => set({ cat: c })}>
            <i style={{ background: CATS[c] }} />
            {c}
          </button>
        ))}
      </div>

      <label htmlFor="date">Date</label>
      <input id="date" className="f" type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />

      {err && <p className="err" role="alert">{err}</p>}
      <button className="go" type="submit">Add expense</button>
    </form>
  )
}
