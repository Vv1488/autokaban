import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "./CartContext";

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <img src="/images/logo.png" alt="AutoKaban" style={styles.logoImg} />
        </Link>

        <button
          style={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span style={{ ...styles.burgerLine, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ ...styles.burgerLine, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...styles.burgerLine, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>

        <nav style={{ ...styles.nav, display: menuOpen ? "flex" : undefined }}>
          <NavLink to="/" style={({ isActive }) => ({ ...styles.link, borderBottomColor: isActive ? "var(--orange)" : "transparent" })} onClick={() => setMenuOpen(false)}>
            Головна
          </NavLink>
          <NavLink to="/catalog" style={({ isActive }) => ({ ...styles.link, borderBottomColor: isActive ? "var(--orange)" : "transparent" })} onClick={() => setMenuOpen(false)}>
            Каталог
          </NavLink>
          <NavLink to="/about" style={({ isActive }) => ({ ...styles.link, borderBottomColor: isActive ? "var(--orange)" : "transparent" })} onClick={() => setMenuOpen(false)}>
            Про нас
          </NavLink>
          <NavLink to="/contacts" style={({ isActive }) => ({ ...styles.link, borderBottomColor: isActive ? "var(--orange)" : "transparent" })} onClick={() => setMenuOpen(false)}>
            Контакти
          </NavLink>
          <NavLink to="/faq" style={({ isActive }) => ({ ...styles.link, borderBottomColor: isActive ? "var(--orange)" : "transparent" })} onClick={() => setMenuOpen(false)}>
            FAQ
          </NavLink>
        </nav>

        <button style={styles.cartBtn} onClick={() => setIsOpen(true)}>
          🛒
          {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "var(--header-height)",
    background: "rgba(13, 13, 13, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid var(--border)",
    zIndex: 1000,
  },
  inner: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 20px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
  },
  logoImg: {
    height: 48,
    width: "auto",
    display: "block",
  },
  nav: {
    display: "flex",
    gap: 24,
  },
  link: {
    color: "var(--text)",
    textDecoration: "none",
    fontWeight: 500,
    padding: "4px 0",
    borderBottom: "2px solid transparent",
    transition: "color 0.2s, border-color 0.2s",
  },
  cartBtn: {
    position: "relative",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    padding: 8,
    color: "#fff",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "var(--orange)",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  burger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 5,
  },
  burgerLine: {
    display: "block",
    width: 24,
    height: 2,
    background: "#fff",
    borderRadius: 2,
    transition: "all 0.3s",
  },
};

const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
  @media (max-width: 768px) {
    header nav {
      display: none !important;
      position: fixed;
      top: var(--header-height);
      left: 0;
      right: 0;
      background: rgba(13, 13, 13, 0.98);
      flex-direction: column;
      padding: 16px;
      gap: 12px;
      border-bottom: 1px solid var(--border);
    }
    header nav[style*="display: flex"],
    header nav[style*="display:flex"] {
      display: flex !important;
    }
    header button[aria-label="Меню"] {
      display: flex !important;
    }
  }
`;
document.head.appendChild(mobileStyles);
