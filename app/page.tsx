import Image from "next/image"
import Link from "next/link"

const products = [
  { name: "Modern Lounge Chair", price: "KSh 8,500", image: "/images/sofa.png", alt: "Modern lounge chair", description: "A comfortable statement piece designed to bring style and relaxation to your living room." },
  { name: "Premium Accent Chair", price: "KSh 12,500", image: "/images/product-2.png", alt: "Premium accent chair", description: "Add character and comfort to your space with a beautifully designed accent chair." },
  { name: "Ergonomic Office Chair", price: "KSh 15,000", image: "/images/product-3.png", alt: "Ergonomic office chair", description: "Designed to provide comfortable support while you work, study, or create." },
]

const benefits = [
  ["Reliable Delivery", "Get your furniture delivered conveniently to your location."],
  ["Easy Shopping", "Browse our collection and find the right furniture without the hassle."],
  ["Customer Support", "Our team is available to help you choose the right furniture for your space."],
  ["Easy Returns", "Shop with confidence with a straightforward returns process."],
]

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <h1>Quality Furniture<br />For Every Home</h1>
            <p>Discover stylish, comfortable, and durable furniture designed to transform your living space. Shop quality pieces at Northstar Furniture and create a home you love.</p>
            <div className="hero-actions"><Link className="btn btn-primary" href="/shop">Shop Now</Link><Link className="btn btn-outline" href="/shop">Explore Collection</Link></div>
          </div>
          <Image className="hero-image" src="/images/sofa.png" alt="Modern Northstar sofa" width={650} height={500} priority />
        </div>
      </section>

      <section className="section product-section">
        <div className="shell">
          <div className="section-head"><div><h2>Furniture made for modern living.</h2><p>Explore carefully selected furniture that combines comfort, functionality, and timeless style for your home.</p></div><Link className="text-link" href="/shop">Explore Shop</Link></div>
          <div className="products">{products.map((product) => <Link className="product-card" href="/shop" key={product.name}><Image src={product.image} alt={product.alt} width={420} height={320} /><h3>{product.name}</h3><strong>{product.price}</strong></Link>)}</div>
        </div>
      </section>

      <section className="section benefits-section"><div className="shell"><div className="center-heading"><h2>Why Choose Northstar?</h2><p>We believe good furniture should look great, feel comfortable, and last. Northstar Furniture makes it easier to find pieces that fit your home and your lifestyle.</p></div><div className="benefits">{benefits.map(([title, copy]) => <article className="benefit" key={title}><div className="benefit-icon" aria-hidden="true">✦</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="section story-section"><div className="shell story-grid"><div className="story-collage"><Image src="/images/sofa.png" alt="Modern living room sofa" width={560} height={430} /><div className="story-stack"><Image src="/images/product-2.png" alt="Stylish upholstered chair" width={220} height={180} /><Image src="/images/product-3.png" alt="Contemporary office chair" width={220} height={180} /></div></div><div><h2>Furniture That Makes Your House Feel Like Home</h2><p>Your furniture should do more than fill a room. It should create comfort, express your style, and make everyday living better. At Northstar, we bring together furniture designed for real homes and modern lifestyles.</p><ul><li>Stylish designs for modern interiors</li><li>Comfortable furniture for everyday living</li><li>Quality materials built for durability</li><li>Furniture options for different budgets</li></ul><Link className="btn btn-primary" href="/shop">Shop Our Collection</Link></div></div></section>

      <section className="section tips-section"><div className="shell"><div className="section-head"><h2>Furniture Tips &amp; Ideas</h2><Link className="text-link" href="/support">View All Posts</Link></div><div className="tips">{[["How to Choose the Right Sofa", "sofa"], ["How to Keep Your Furniture Looking New", "furniture care"], ["Smart Furniture Ideas for Small Spaces", "small space furniture"]].map(([title, alt], index) => <article className="tip" key={title}><Image src={index === 0 ? "/images/sofa.png" : index === 1 ? "/images/product-2.png" : "/images/product-3.png"} alt={alt} width={360} height={220} /><h3>{title}</h3><p>By <span>Northstar</span> Furniture Guide</p></article>)}</div></div></section>
    </main>
  )
}
