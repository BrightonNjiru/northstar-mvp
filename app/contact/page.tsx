'use client'

import { FormEvent, useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message') }) })
    if (!response.ok) { setError((await response.json()).error || 'Please try again.'); return }
    setSent(true)
  }
  return <main><div className="shell page-title"><div className="eyebrow">We are here to help</div><h1>Contact us</h1><p>Questions about a piece, delivery, or your order? Send us a note.</p></div><section className="section"><div className="shell">{sent ? <p className="notice">Thanks — your message is on its way to our team.</p> : <form className="form" onSubmit={submit}><label>Name<input className="input" name="name" required /></label><label>Email<input className="input" name="email" type="email" required /></label><label>Message<textarea className="input" name="message" rows={6} required /></label>{error && <p className="notice">{error}</p>}<button className="btn btn-primary">Send message</button></form>}</div></section></main>
}
