import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingBag, UserRound } from "lucide-react"
import "./globals.css"

export const metadata: Metadata = { title: "Northstar Furniture", description: "Quality furniture for every home." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-[#eff2f1]"><body>
    <header className="site-header"><div className="shell nav-wrap">
      <Link href="/" className="brand">Northstar<span>Co.</span></Link>
      <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/contact">Contact Us</Link></nav>
      <div className="nav-actions"><Link href="/account" aria-label="Account"><UserRound size={20}/></Link><Link href="/cart" aria-label="Cart"><ShoppingBag size={20}/></Link></div>
    </div></header>{children}
  </body></html>
}
