import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase.from('support_articles').select('title,body,category').eq('published', true).order('category')
  return <main><div className="shell page-title"><div className="eyebrow">Northstar care</div><h1>Support center</h1><p>Answers for orders, delivery, and returns.</p></div><section className="section"><div className="shell card-grid">{(articles ?? []).map((article) => <article className="card" key={article.title}><div className="eyebrow">{article.category}</div><h2>{article.title}</h2><p>{article.body}</p></article>)}<article className="card"><div className="eyebrow">Still need help?</div><h2>Talk to our team</h2><p>Send us a note and we will get back to you.</p><Link className="btn btn-primary" href="/contact">Contact us</Link></article></div></section></main>
}
