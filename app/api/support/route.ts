import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().email().max(200), message: z.string().trim().min(10).max(4000) })

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please complete all fields.' }, { status: 400 })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase.from('support_requests').insert({ ...parsed.data, user_id: user?.id ?? null, subject: 'General enquiry', category: 'General' })
  if (error) return NextResponse.json({ error: 'We could not send your message.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
