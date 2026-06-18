import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const outOfStock = product.inStock === false;

  return (
    <div style={{ ...styles.card, ...(outOfStock ? styles.cardOut : {}) }}>
      {product.isHit && <span style={styles.badge}>Хіт</span>}
      {product.isNew && <span style={{ ...styles.badge, background: "#4caf50" }}>Новинка</span>}
      {outOfStock && <span style={styles.badgeOut}>Немає в наявності</span>}

      <Link to={`/product/${product.id}`}>
        <div style={styles.imageWrap}>
          <img src={product.images[0]} alt={product.name} style={{ ...styles.image, ...(outOfStock ? styles.imageOut : {}) }} />
        </div>
      </Link>

      <div style={styles.info}>
        <Link to={`/product/${product.id}`} style={styles.name}>
          {product.name}
        </Link>

        <div style={styles.prices}>
          <span style={{ ...styles.price, ...(outOfStock ? styles.priceOut : {}) }}>{product.price} грн</span>
        </div>

        {outOfStock ? (
          <button className="btn" style={styles.btnOut} disabled>
            Немає в наявності
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={styles.btn}
            onClick={() => addToCart(product)}
          >
            В кошик
          </button>
        )}
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
    top: 8,
    left: 8,
    background: "var(--orange)",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 20,
    fontSize: "0.7rem",
    fontWeight: 700,
    zIndex: 1,
  },
  badgeOut: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "#f44336",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 20,
    fontSize: "0.7rem",
    fontWeight: 700,
    zIndex: 1,
  },
  cardOut: {
    opacity: 0.85,
  },
  imageOut: {
    filter: "grayscale(1)",
  },
  priceOut: {
    opacity: 0.6,
  },
  btnOut: {
    width: "100%",
    padding: "8px",
    fontSize: "0.8rem",
    background: "#3a3a3a",
    color: "#999",
    border: "1px solid #555",
    cursor: "not-allowed",
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
    padding: 8,
    boxSizing: "border-box",
  },
  info: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  name: {
    color: "var(--text)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  prices: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
  },
  price: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "var(--orange)",
  },
  btn: {
    width: "100%",
    padding: "8px",
    fontSize: "0.8rem",
  },
};
