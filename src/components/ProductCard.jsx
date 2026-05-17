import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      {product.isHit && <span style={styles.badge}>Хіт</span>}
      {product.isNew && <span style={{ ...styles.badge, background: "#4caf50" }}>Новинка</span>}

      <Link to={`/product/${product.id}`}>
        <div style={styles.imageWrap}>
          <img src={product.images[0]} alt={product.name} style={styles.image} />
        </div>
      </Link>

      <div style={styles.info}>
        <Link to={`/product/${product.id}`} style={styles.name}>
          {product.name}
        </Link>

        <div style={styles.prices}>
          <span style={styles.price}>{product.price} грн</span>
          {product.oldPrice && (
            <span style={styles.oldPrice}>{product.oldPrice} грн</span>
          )}
        </div>

        <button
          className="btn btn-primary"
          style={styles.btn}
          onClick={() => addToCart(product)}
        >
          В кошик
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "var(--orange)",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontWeight: 700,
    zIndex: 1,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: "1",
    overflow: "hidden",
    background: "#1f1f1f",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.3s",
    padding: 12,
    boxSizing: "border-box",
  },
  info: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  name: {
    color: "var(--text)",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  prices: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: "auto",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "var(--orange)",
  },
  oldPrice: {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    textDecoration: "line-through",
  },
  btn: {
    width: "100%",
    padding: "10px",
    fontSize: "0.9rem",
  },
};
