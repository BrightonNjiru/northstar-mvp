import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingBag, UserRound } from 'lucide-react'
import './globals.css'

export const metadata: Metadata = { title: 'Northstar Furniture — Quality Furniture for Every Home', description: 'Quality, comfort, and contemporary style for every home.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body><header className="site-header"><div className="shell nav-wrap"><Link href="/" className="brand">Northstar<span>Co.</span></Link><nav aria-label="Northstar Furniture navigation"><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/contact">Contact Us</Link></nav><div className="nav-actions"><Link href="/account" aria-label="Login to your account"><UserRound aria-hidden="true" /></Link><Link href="/cart" aria-label="Shopping cart"><ShoppingBag aria-hidden="true" /></Link></div></div></header>{children}</body></html>
}
