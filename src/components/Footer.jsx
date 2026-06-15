import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner} data-footer-inner>
        <div style={styles.col}>
          <div style={styles.logo}>
            <img src="/images/logo.png" alt="AutoKaban" style={styles.logoImg} />
          </div>
          <p style={styles.desc}>
            Інтернет-магазин автоаксесуарів та гаджетів. Якісні товари за
            доступними цінами з доставкою по всій Україні.
          </p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Магазин</h4>
          <Link to="/catalog" style={styles.footerLink}>Каталог</Link>
          <Link to="/about" style={styles.footerLink}>Про нас</Link>
          <Link to="/contacts" style={styles.footerLink}>Контакти</Link>
          <Link to="/faq" style={styles.footerLink}>Часті питання</Link>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Доставка</h4>
          <p style={styles.footerText}>Нова Пошта по всій Україні</p>
          <p style={styles.footerText}>Накладений платіж</p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Контакти</h4>
          <a href="https://t.me/autokaban" style={styles.footerLink}>Telegram</a>
          <a href="tel:+380980630594" style={styles.footerLink}>+38 (098) 063-05-94</a>
          <a href="mailto:autokaban.store@gmail.com" style={styles.footerLink}>autokaban.store@gmail.com</a>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Інформація</h4>
          <Link to="/shipping" style={styles.footerLink}>Доставка та оплата</Link>
          <Link to="/returns" style={styles.footerLink}>Повернення та обмін</Link>
          <Link to="/privacy" style={styles.footerLink}>Політика конфіденційності</Link>
          <Link to="/terms" style={styles.footerLink}>Умови використання</Link>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} AutoKaban. Усі права захищені.</p>
        <p style={styles.bottomInfo}>
          Інтернет-магазин автоаксесуарів · Доставка Новою Поштою по всій Україні · +38 (098) 063-05-94
        </p>
      </div>
    </footer>
  );
}

const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
  @media (max-width: 768px) {
    [data-footer-inner] {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
      padding: 24px 12px 16px !important;
    }
  }
`;
document.head.appendChild(mobileStyles);

const styles = {
  footer: {
    background: "#111",
    borderTop: "1px solid var(--border)",
    marginTop: "auto",
  },
  inner: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "40px 20px 20px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
    gap: 30,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  logo: {
    marginBottom: 8,
  },
  logoImg: {
    height: 64,
    width: "auto",
    display: "block",
  },
  desc: {
    color: "var(--text-muted)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  colTitle: {
    color: "#fff",
    fontSize: "1rem",
    marginBottom: 4,
  },
  footerLink: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.2s",
  },
  footerText: {
    color: "var(--text-muted)",
    fontSize: "0.9rem",
  },
  bottom: {
    borderTop: "1px solid var(--border)",
    padding: "16px 20px",
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "0.85rem",
  },
  bottomInfo: {
    marginTop: 4,
    fontSize: "0.8rem",
    opacity: 0.8,
  },
};
