import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const orderSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(200),
  address: z.string().trim().min(8).max(500),
  items: z.array(z.object({ product_id: z.string().uuid(), quantity: z.number().int().min(1).max(20) })).min(1).max(50),
  idempotency_key: z.string().uuid(),
})

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const parsed = orderSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Please review your order details.' }, { status: 400 })
  const { data, error } = await supabase.rpc('place_order', {
    p_user_id: user.id,
    p_name: parsed.data.name,
    p_email: parsed.data.email,
    p_address: parsed.data.address,
    p_items: parsed.data.items,
    p_idempotency_key: parsed.data.idempotency_key,
  })
  if (error) {
    const message = error.message.includes('insufficient inventory') ? 'One or more items are no longer available in that quantity.' : 'We could not place your order. Please try again.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
  return NextResponse.json({ orderId: data })
}
