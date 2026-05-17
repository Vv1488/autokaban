import { useCart } from "./CartContext";
import OrderForm from "./OrderForm";

export default function CartModal() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={() => setIsOpen(false)}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3>🛒 Кошик</h3>
          <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={styles.empty}>
            <p>Кошик порожній</p>
            <button className="btn btn-primary" onClick={() => setIsOpen(false)}>Продовжити покупки</button>
          </div>
        ) : (
          <>
            <div style={styles.items}>
              {cart.map((item) => (
                <div key={item.id} style={styles.item}>
                  <div style={styles.itemInfo}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemPrice}>{item.price} грн</span>
                  </div>
                  <div style={styles.itemControls}>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.total}>
              <span>Разом:</span>
              <span style={styles.totalPrice}>{totalPrice} грн</span>
            </div>

            <OrderForm
              cart={cart}
              totalPrice={totalPrice}
              onSuccess={() => clearCart()}
            />
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 2000,
    display: "flex",
    justifyContent: "flex-end",
  },
  modal: {
    width: "100%",
    maxWidth: 460,
    background: "var(--bg-card)",
    height: "100vh",
    overflowY: "auto",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    padding: 4,
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    color: "var(--text-muted)",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
  },
  item: {
    background: "var(--bg)",
    borderRadius: "var(--radius-sm)",
    padding: 12,
  },
  itemInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemName: {
    color: "#fff",
    fontSize: "0.9rem",
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    color: "var(--orange)",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  itemControls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "var(--bg-card)",
    color: "#fff",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    color: "#fff",
    fontWeight: 600,
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    background: "none",
    border: "none",
    marginLeft: "auto",
    fontSize: "1.1rem",
    opacity: 0.6,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderTop: "1px solid var(--border)",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#fff",
  },
  totalPrice: {
    color: "var(--orange)",
    fontSize: "1.3rem",
  },
};
