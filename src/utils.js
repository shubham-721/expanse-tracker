export const pad = (n) => String(n).padStart(2, '0')

const now = new Date()
export const TODAY = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
export const THIS_MONTH = TODAY.slice(0, 7)
export const TODAY_DAY = now.getDate()

export const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

const BASE = [
  [1, 'Home', 'Rent', 18000],
  [2, 'Bills', 'Electricity bill', 1840],
  [3, 'Food', 'Filter coffee and idli', 140],
  [4, 'Travel', 'Metro card top-up', 500],
  [6, 'Food', 'Biryani with friends', 920],
  [7, 'Fun', 'Movie tickets', 640],
  [9, 'Health', 'Pharmacy', 380],
  [11, 'Food', 'Weekly groceries', 2310],
  [12, 'Travel', 'Cab to office', 260],
  [14, 'Bills', 'Broadband', 799],
  [15, 'Fun', 'Board game cafe', 700],
  [17, 'Food', 'Lunch at office canteen', 180],
  [19, 'Health', 'Gym membership', 1500],
  [21, 'Food', 'Vegetables and fruit', 540],
  [23, 'Travel', 'Auto rickshaw', 120],
  [25, 'Fun', 'Concert pass', 1800],
  [27, 'Food', 'Dinner out', 1150],
  [28, 'Bills', 'Phone recharge', 299],
]

// Sample data for this month and last month so the dashboard is not empty
export function seedExpenses() {
  const out = []
  let id = 1
  for (let off = 0; off >= -1; off--) {
    const d = new Date(now.getFullYear(), now.getMonth() + off, 1)
    BASE.forEach(([day, cat, note, amt]) => {
      if (off === 0 && day > TODAY_DAY) return
      out.push({
        id: id++,
        date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(day)}`,
        cat,
        note,
        amt: Math.round(amt * (off ? 0.93 : 1)),
      })
    })
  }
  return out
}
