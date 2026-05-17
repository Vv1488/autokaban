import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";
import products from "../data/products.json";

export default function CatalogPage() {
  const { category } = useParams();

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const currentCategory = categories.find((c) => c.id === category);

  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h2>{currentCategory ? currentCategory.name : "Усі товари"}</h2>
          <p>{filtered.length} товарів</p>
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
            <p>Товарів у цій категорії поки немає</p>
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
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 32,
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: 20,
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "all 0.2s",
    border: "1px solid var(--border)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
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
