import { createClient } from '@/lib/supabase/server'
import ReturnForm from './return-form'

export default async function ReturnsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <main><div className="shell page-title"><div className="eyebrow">Aftercare</div><h1>Returns</h1><p>Please sign in to request a return.</p><a className="btn btn-primary" href="/auth/login">Sign in</a></div></main>
  const { data: orders } = await supabase.from('orders').select('id,created_at,total_cents,status').eq('user_id', user.id).order('created_at', { ascending: false })
  return <main><div className="shell page-title"><div className="eyebrow">Aftercare</div><h1>Request a return</h1><p>We review return requests within two business days.</p></div><section className="section"><div className="shell"><ReturnForm orders={orders ?? []} /></div></section></main>
}
