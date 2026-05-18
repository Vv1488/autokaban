import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";
import products from "../data/products.json";

export default function MainPage() {
  const hitProducts = products.filter((p) => p.isHit);
  const newProducts = products.filter((p) => p.isNew);

  return (
    <>
      <Helmet>
        <title>AutoKaban — Автоаксесуари та гаджети</title>
        <meta name="description" content="Інтернет-магазин автоаксесуарів AutoKaban. Магнітоли, компресори, пилососи, автохімія та багато іншого. Доставка по всій Україні." />
      </Helmet>
    <div>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Автоаксесуари <br />
            <span style={{ color: "var(--orange)" }}>для справжніх водіїв</span>
          </h1>
          <p style={styles.heroSub}>
            Якісні товари для вашого авто за найкращими цінами. Доставка по всій Україні.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/catalog" className="btn btn-primary" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
              Перейти в каталог
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ fontSize: "1.1rem", padding: "14px 32px" }}>
              Про нас
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section">
        <div className="container">
          <div style={styles.advantages}>
            <div style={styles.advItem}>
              <span style={styles.advIcon}>🚚</span>
              <h3>Доставка</h3>
              <p>Нова Пошта по всій Україні</p>
            </div>
            <div style={styles.advItem}>
              <span style={styles.advIcon}>💰</span>
              <h3>Накладений платіж</h3>
              <p>Оплачуєте при отриманні</p>
            </div>
            <div style={styles.advItem}>
              <span style={styles.advIcon}>✅</span>
              <h3>Гарантія</h3>
              <p>Перевірені товари від надійних постачальників</p>
            </div>
            <div style={styles.advItem}>
              <span style={styles.advIcon}>📞</span>
              <h3>Підтримка</h3>
              <p>Консультація та допомога у виборі</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <div className="section-title">
            <h2>Категорії товарів</h2>
            <p>Оберіть потрібну категорію</p>
          </div>
          <div style={styles.categories}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.id}`}
                style={styles.catCard}
              >
                <span style={styles.catIcon}>{cat.icon}</span>
                <span style={styles.catName}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hit Products */}
      {hitProducts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>🔥 Хіти продажів</h2>
              <p>Найпопулярніші товари</p>
            </div>
            <div style={styles.grid}>
              {hitProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="section" style={{ background: "var(--bg-card)" }}>
          <div className="container">
            <div className="section-title">
              <h2>🆕 Новинки</h2>
              <p>Щойно додані товари</p>
            </div>
            <div style={styles.grid}>
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
}

const styles = {
  hero: {
    position: "relative",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    background: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400') center/cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "40px 16px",
  },
  heroTitle: {
    fontSize: "clamp(1.75rem, 5vw, 3rem)",
    lineHeight: 1.2,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
    color: "var(--text)",
    maxWidth: 500,
    marginBottom: 24,
  },
  heroBtns: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  advantages: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  advItem: {
    textAlign: "center",
    padding: "16px 12px",
    borderRadius: "var(--radius)",
    background: "var(--bg-card)",
  },
  advIcon: {
    fontSize: "2rem",
    display: "block",
    marginBottom: 8,
  },
  categories: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
  },
  catCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "16px 10px",
    background: "var(--bg)",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  catIcon: { fontSize: "2rem" },
  catName: {
    color: "#fff",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
  },
};
