import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Summary from './components/Summary.jsx'
import DailyChart from './components/DailyChart.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import { CATS, DEFAULT_BUDGET } from './constants.js'
import { pad, seedExpenses, THIS_MONTH, TODAY_DAY } from './utils.js'

export default function App() {
  const [items, setItems] = useLocalStorage('lg-items', seedExpenses)
  const [budget, setBudget] = useLocalStorage('lg-budget', DEFAULT_BUDGET)
  const [month, setMonth] = useState(THIS_MONTH)
  const [filter, setFilter] = useState(null)

  const [y, m] = month.split('-').map(Number)
  const label = new Date(y, m - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  const shiftMonth = (n) => {
    const d = new Date(y, m - 1 + n, 1)
    setMonth(`${d.getFullYear()}-${pad(d.getMonth() + 1)}`)
    setFilter(null)
  }

  const monthItems = useMemo(() => items.filter((i) => i.date.startsWith(month)), [items, month])
  const total = monthItems.reduce((s, i) => s + i.amt, 0)
  const byCat = Object.keys(CATS).map((c) => ({
    c,
    v: monthItems.filter((i) => i.cat === c).reduce((s, i) => s + i.amt, 0),
  }))

  const daysInMonth = new Date(y, m, 0).getDate()
  const elapsed = month === THIS_MONTH ? TODAY_DAY : daysInMonth
  const daily = Array.from({ length: daysInMonth }, (_, i) =>
    monthItems.filter((t) => Number(t.date.slice(8)) === i + 1).reduce((s, t) => s + t.amt, 0)
  )

  const addExpense = (entry) => {
    setItems([...items, { id: Date.now(), ...entry }])
    setMonth(entry.date.slice(0, 7))
    setFilter(null)
  }
  const removeExpense = (id) => setItems(items.filter((t) => t.id !== id))

  return (
    <div className="wrap">
      <Header label={label} onShift={shiftMonth} />
      <Summary
        label={label}
        total={total}
        budget={budget}
        setBudget={setBudget}
        elapsed={elapsed}
        byCat={byCat}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="grid">
        <main>
          <DailyChart daily={daily} />
          <ExpenseList
            items={monthItems.filter((i) => !filter || i.cat === filter)}
            filter={filter}
            monthHasItems={monthItems.length > 0}
            onRemove={removeExpense}
          />
        </main>
        <ExpenseForm onAdd={addExpense} />
      </div>
    </div>
  )
}
