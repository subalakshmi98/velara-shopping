import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    id: 1, name: "The Sculpted Blazer", price: 189, category: "Outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    badge: "New"
  },
  {
    id: 2, name: "Silk Column Dress", price: 159, category: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    badge: "Best seller"
  },
  {
    id: 3,
    name: "Relaxed Tailored Trousers",
    price: 119,
    category: "Trousers",
    image: "https://images.unsplash.com/photo-1789110853487-b886411f11cb?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Cobalt Knit Top",
    price: 89,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    badge: "Limited"
  },
  {
    id: 5, name: "Soft Structure Coat", price: 229, category: "Outerwear",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6, name: "Minimal Slip Dress", price: 139, category: "Dresses",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85"
  }
];

const categories = ["All", "Dresses", "Tops", "Trousers", "Outerwear"];

function Icon({ name, size = 20 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
    heart: <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="m5 5 14 14"/><path d="m19 5-14 14"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(
    () => activeCategory === "All" ? products : products.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      return found ? prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item) : [...prev, {...product, qty: 1}];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? {...item, qty: Math.max(0, item.qty + delta)} : item).filter(item => item.qty));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="site">
      <div className="announcement">FREE EXPRESS SHIPPING ON ORDERS OVER €150 <span>·</span> EASY 30-DAY RETURNS</div>

      <header className="header">
        <button className="mobile-menu" aria-label="Open menu"><Icon name="menu" /></button>
        <a className="logo" href="#top">VELARA<span>®</span></a>
        <nav>
          <a href="#new">New In</a>
          <a href="#shop">Shop</a>
          <a href="#editorial">Editorial</a>
          <a href="#about">About</a>
        </nav>
        <div className="actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search"><Icon name="search" /></button>
          <button aria-label="Wishlist"><Icon name="heart" /></button>
          <button onClick={() => setCartOpen(true)} className="bag-button" aria-label="Shopping bag">
            <Icon name="bag" /><span>{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="new">
          <div className="hero-copy">
            <p className="eyebrow">AUTUMN / WINTER 2026</p>
            <h1>Wear the<br/><em>moment.</em></h1>
            <p className="hero-text">Quiet confidence, considered cuts and a palette made for everyday rituals.</p>
            <a className="button dark" href="#shop">Explore collection <Icon name="arrow" size={17}/></a>
          </div>
          <div className="hero-image-wrap">
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1500&q=90" alt="Model wearing an elegant neutral outfit" />
            <div className="hero-note">01 / 04<br/><span>THE NEW UNIFORM</span></div>
          </div>
          <div className="color-card">
            <span className="swatch cobalt"></span>
            <strong>COBALT<br/>BLUE</strong>
            <small>#2C3480</small>
          </div>
        </section>

        <section className="ticker" aria-label="Brand statement">
          <span>MORE THAN CLOTHING</span><b>✦</b><span>MADE TO LAST</span><b>✦</b><span>DESIGNED IN BERLIN</span><b>✦</b><span>MORE THAN CLOTHING</span>
        </section>

        <section className="intro" id="about">
          <div className="section-label">01 — THE COLLECTION</div>
          <div>
            <h2>Pieces that make<br/><em>an entrance.</em></h2>
            <p>We believe the strongest wardrobe is edited, not endless. Discover elevated essentials designed to move with you — from first coffee to last light.</p>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-head">
            <div>
              <div className="section-label">02 — SHOP</div>
              <h2>Current <em>favourites</em></h2>
            </div>
            <div className="filters">
              {categories.map(cat => (
                <button key={cat} className={activeCategory === cat ? "active" : ""} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filtered.map((p) => (
              <article className="product" key={p.id}>
                <div className="product-image">
                  <img src={p.image} alt={p.name} loading="lazy"/>
                  {p.badge && <span className="badge">{p.badge}</span>}
                  <button className="quick-add" onClick={() => addToCart(p)}>Add to bag <Icon name="plus" size={15}/></button>
                </div>
                <div className="product-meta">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.category}</p>
                  </div>
                  <strong>€{p.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial" id="editorial">
          <div className="editorial-image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90" alt="Clothing on a minimal studio rail"/>
          </div>
          <div className="editorial-copy">
            <div className="section-label">03 — THE EDIT</div>
            <p className="large-quote">“Elegance is not a feeling. It is a practice.”</p>
            <p>Texture, proportion and restraint. Our latest edit pairs tactile fabrics with clean silhouettes for a wardrobe that feels unmistakably yours.</p>
            <a href="#shop" className="text-link">Shop the edit <Icon name="arrow" size={16}/></a>
          </div>
        </section>

        <section className="statement">
          <p className="eyebrow">VELARA STUDIO</p>
          <h2>Less noise.<br/><em>More you.</em></h2>
        </section>

        <section className="newsletter">
          <div>
            <div className="section-label">04 — KEEP IN TOUCH</div>
            <h2>Notes from <em>Velara.</em></h2>
          </div>
          <div>
            <p>New arrivals, private edits and stories from the studio. No noise, just the good things.</p>
            {subscribed ? (
              <div className="success">You're on the list. Welcome to Velara.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if(email) setSubscribed(true); }}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Your email address" required />
                <button type="submit">Subscribe <Icon name="arrow" size={16}/></button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-brand">VELARA<span>®</span><p>Modern clothing for a life well lived.</p></div>
        <div className="footer-links"><div><b>SHOP</b><a href="#shop">New In</a><a href="#shop">Dresses</a><a href="#shop">Tops</a><a href="#shop">Outerwear</a></div><div><b>HELP</b><a href="#footer">Shipping</a><a href="#footer">Returns</a><a href="#footer">Size guide</a><a href="#footer">Contact</a></div><div><b>FOLLOW</b><a href="#footer">Instagram</a><a href="#footer">Pinterest</a><a href="#footer">TikTok</a></div></div>
        <div className="footer-bottom"><span>© 2026 VELARA STUDIO</span><span>BERLIN · PARIS · EVERYWHERE</span></div>
      </footer>

      {searchOpen && <div className="overlay" onClick={() => setSearchOpen(false)}>
        <div className="search-panel" onClick={e => e.stopPropagation()}>
          <button className="close" onClick={() => setSearchOpen(false)}><Icon name="close"/></button>
          <span>SEARCH VELARA</span>
          <input autoFocus placeholder="Try “silk dress”" />
          <p>Search is ready — connect this field to your catalogue API when you add backend search.</p>
        </div>
      </div>}

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}>
        <aside className="cart" onClick={e => e.stopPropagation()}>
          <div className="cart-head"><h2>Your bag <span>{cartCount}</span></h2><button onClick={() => setCartOpen(false)}><Icon name="close"/></button></div>
          {cart.length === 0 ? (
            <div className="empty-cart"><p>Your bag is waiting.</p><button className="button dark" onClick={() => setCartOpen(false)}>Continue shopping</button></div>
          ) : (
            <>
              <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name}/>
                <div><h3>{item.name}</h3><p>€{item.price}</p><div className="qty"><button onClick={() => changeQty(item.id,-1)}><Icon name="minus" size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}><Icon name="plus" size={13}/></button></div></div>
              </div>)}</div>
              <div className="cart-total"><span>Subtotal</span><strong>€{total}</strong></div>
              <button className="button dark checkout">Checkout <Icon name="arrow" size={17}/></button>
            </>
          )}
        </aside>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
