import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";
import products from "../data/products.json";

export default function CatalogPage() {
  const { category } = useParams();
  const [search, setSearch] = useState("");

  const byCategory = category
    ? products.filter((p) => p.category === category)
    : products;

  const filtered = search.trim()
    ? byCategory.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : byCategory;

  const currentCategory = categories.find((c) => c.id === category);

  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>{currentCategory ? `${currentCategory.name} — AutoKaban` : "Каталог — AutoKaban"}</title>
          <meta name="description" content={currentCategory ? `${currentCategory.name} за найкращими цінами. Доставка по всій Україні.` : "Каталог автоаксесуарів та гаджетів. Магнітоли, компресори, пилососи та інше."} />
        </Helmet>
        <div className="section-title">
          <h2>{currentCategory ? currentCategory.name : "Усі товари"}</h2>
          <p>{filtered.length} товарів</p>
        </div>

        {/* Search */}
        <div style={styles.searchWrap}>
          <input
            type="text"
            placeholder="Пошук товарів..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Category filter */}
        <div style={styles.filters}>
          <Link
            to="/catalog"
            style={{
              ...styles.filterBtn,
              background: !category ? "var(--orange)" : "var(--bg-card)",
              color: !category ? "#fff" : "var(--text)",
            }}
          >
            Усі
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog/${cat.id}`}
              style={{
                ...styles.filterBtn,
                background: category === cat.id ? "var(--orange)" : "var(--bg-card)",
                color: category === cat.id ? "#fff" : "var(--text)",
              }}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <p>Товарів не знайдено</p>
            <Link to="/catalog" className="btn btn-primary">
              Переглянути всі товари
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  searchWrap: {
    maxWidth: 400,
    margin: "0 auto 20px",
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 20,
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center",
    marginBottom: 24,
  },
  filterBtn: {
    padding: "6px 12px",
    borderRadius: 20,
    textDecoration: "none",
    fontSize: "0.8rem",
    fontWeight: 500,
    transition: "all 0.2s",
    border: "1px solid var(--border)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "var(--text-muted)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
};
