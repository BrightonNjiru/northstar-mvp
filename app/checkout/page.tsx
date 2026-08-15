'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Checkout() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const items = JSON.parse(sessionStorage.getItem('northstar-cart') || '[]') as Array<{ id: string; quantity: number }>
    if (!items.length) return setError('Your cart is empty.')
    const response = await fetch('/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, address, idempotency_key: crypto.randomUUID(), items: items.map((item) => ({ product_id: item.id, quantity: item.quantity })) }),
    })
    const result = await response.json()
    if (!response.ok) return setError(result.error || 'We could not place your order.')
    sessionStorage.removeItem('northstar-cart')
    router.push(`/thank-you?order=${result.orderId}`)
  }

  return <main><div className="shell page-title"><div className="eyebrow">Almost home</div><h1>Checkout</h1></div><section className="section"><div className="shell"><form className="form" onSubmit={submit}><label>Full name<input className="input" required value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email<input className="input" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Delivery address<textarea className="input" rows={4} required value={address} onChange={(event) => setAddress(event.target.value)} /></label>{error && <p className="notice">{error}</p>}<button className="btn btn-primary">Place order</button><p><Link href="/cart">Return to cart</Link></p></form></div></section></main>
}
