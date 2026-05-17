import { useState } from "react";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-title">
          <h2>Контакти</h2>
          <p>Зв'яжіться з нами зручним для вас способом</p>
        </div>

        <div style={styles.layout} data-contacts-layout>
          <div style={styles.info}>
            <div style={styles.infoBlock}>
              <h3>📍 Адреса</h3>
              <p style={styles.text}>м. Дніпро, Україна</p>
            </div>

            <div style={styles.infoBlock}>
              <h3>📞 Телефон</h3>
              <a href="tel:+380980630594" style={styles.link}>
                +38 (098) 063-05-94
              </a>
            </div>

            <div style={styles.infoBlock}>
              <h3>💬 Telegram</h3>
              <a
                href="https://t.me/autokaban"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                @autokaban
              </a>
            </div>

            <div style={styles.infoBlock}>
              <h3>🕐 Графік роботи</h3>
              <p style={styles.text}>Пн-Сб: 09:00 — 18:00</p>
              <p style={styles.text}>Нд: вихідний</p>
            </div>
          </div>

          <div style={styles.formWrap}>
            <h3 style={{ marginBottom: 16 }}>Залиште заявку</h3>
            {sent ? (
              <div style={styles.success}>
                <p style={{ fontSize: "2rem" }}>✅</p>
                <h4>Дякуємо!</h4>
                <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
                  Ми зв'яжемося з вами найближчим часом.
                </p>
              </div>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Ваше ім'я"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  style={styles.input}
                  type="tel"
                  placeholder="Номер телефону"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <textarea
                  style={{ ...styles.input, minHeight: 120, resize: "vertical" }}
                  placeholder="Ваше повідомлення"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Надіслати
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    maxWidth: 900,
    margin: "0 auto",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  infoBlock: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius-sm)",
    padding: 20,
  },
  text: {
    color: "var(--text)",
    marginTop: 4,
  },
  link: {
    color: "var(--orange)",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  formWrap: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius)",
    padding: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "#fff",
    outline: "none",
    fontSize: "1rem",
  },
  success: {
    textAlign: "center",
    padding: 20,
  },
};

const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
  @media (max-width: 768px) {
    [data-contacts-layout] {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
  }
`;
document.head.appendChild(mobileStyles);
