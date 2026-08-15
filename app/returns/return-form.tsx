'use client'
import { FormEvent, useState } from 'react'

type Order = { id: string; created_at: string; total_cents: number; status: string }
export default function ReturnForm({ orders }: { orders: Order[] }) {
  const [message, setMessage] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/returns', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: form.get('order_id'), reason: form.get('reason'), details: form.get('details') }) })
    setMessage(response.ok ? 'Your return request has been submitted.' : (await response.json()).error || 'Please try again.')
  }
  return <form className="form" onSubmit={submit}><label>Order<select className="input" name="order_id" required><option value="">Select an order</option>{orders.map((order) => <option key={order.id} value={order.id}>{order.id.slice(0, 8)} · ${(order.total_cents / 100).toFixed(2)} · {order.status}</option>)}</select></label><label>Reason<select className="input" name="reason" required><option value="Damaged">Damaged</option><option value="Not as expected">Not as expected</option><option value="Wrong item">Wrong item</option><option value="Other">Other</option></select></label><label>Details<textarea className="input" name="details" rows={5} /></label>{message && <p className="notice">{message}</p>}<button className="btn btn-primary">Request return</button></form>
}
