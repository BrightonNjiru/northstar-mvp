import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({ order_id: z.string().uuid(), reason: z.string().trim().min(3).max(120), details: z.string().trim().max(1000).optional() })

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please provide a return reason.' }, { status: 400 })
  const { data: order } = await supabase.from('orders').select('id').eq('id', parsed.data.order_id).eq('user_id', user.id).maybeSingle()
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  const { error } = await supabase.from('returns').insert({ ...parsed.data, user_id: user.id })
  if (error) return NextResponse.json({ error: 'A return request could not be created.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
