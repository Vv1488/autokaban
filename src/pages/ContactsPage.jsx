import { useState } from "react";
import { Helmet } from "react-helmet-async";

const BOT_TOKEN = "8997330539:AAEYlHL8hq9kqY20pDBrgcMqEH4tshtWvPo";
const CHAT_ID = "7541394049";

const isValidName = (v) => /^[А-ЯЄІЇҐа-яєіїґA-Za-z'\s-]{2,}$/.test(v.trim());
const isValidPhone = (v) => {
  const d = v.replace(/\D/g, "");
  return (d.length === 10 && d[0] === "0") || (d.length === 12 && d.startsWith("380"));
};
const isValidMessage = (v) => v.trim().length >= 10 && /[А-ЯЄІЇҐа-яєіїґA-Za-z]{3,}/.test(v);

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!isValidName(form.name)) errs.name = "Введіть ім'я літерами (мін. 2 символи)";
    if (!isValidPhone(form.phone)) errs.phone = "Формат: 0XXXXXXXXX або +380XXXXXXXXX";
    if (!isValidMessage(form.message)) errs.message = "Мін. 10 символів з текстом";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("sending");
    const text = `
📩 Нова заявка з сайту AutoKaban

👤 Ім'я: ${form.name.trim()}
📞 Телефон: ${form.phone.trim()}
💬 Повідомлення:
${form.message.trim()}
`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text }),
        }
      );
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", phone: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Контакти — AutoKaban</title>
          <meta name="description" content="Зв'яжіться з AutoKaban. Телефон, Telegram, email, адреса. Залиште заявку — ми передзвонимо." />
        </Helmet>

        <div className="section-title">
          <h2>Контакти</h2>
          <p>Зв'яжіться з нами зручним для вас способом</p>
        </div>

        <div style={styles.layout} data-contacts-layout>
          <div style={styles.info}>
            <div style={styles.infoBlock}>
              <h3>📍 Адреса</h3>
              <p style={styles.text}>вул. Минина 11, м. Дніпро, 49000, Україна</p>
            </div>

            <div style={styles.infoBlock}>
              <h3>📞 Телефон</h3>
              <a href="tel:+380980630594" style={styles.link}>
                +38 (098) 063-05-94
              </a>
            </div>

            <div style={styles.infoBlock}>
              <h3>📧 Email</h3>
              <a href="mailto:vitalijmisura316@gmail.com" style={styles.link}>
                vitalijmisura316@gmail.com
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
            {status === "sent" ? (
              <div style={styles.success}>
                <p style={{ fontSize: "2rem" }}>✅</p>
                <h4>Дякуємо!</h4>
                <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
                  Ми зв'яжемося з вами найближчим часом.
                </p>
              </div>
            ) : (
              <form style={styles.form} onSubmit={handleSubmit}>
                <div>
                  <input
                    style={{ ...styles.input, borderColor: errors.name ? "#f44336" : undefined }}
                    type="text"
                    placeholder="Ваше ім'я"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); clearError("name"); }}
                  />
                  {errors.name && <p style={styles.error}>{errors.name}</p>}
                </div>
                <div>
                  <input
                    style={{ ...styles.input, borderColor: errors.phone ? "#f44336" : undefined }}
                    type="tel"
                    placeholder="Номер телефону"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); clearError("phone"); }}
                  />
                  {errors.phone && <p style={styles.error}>{errors.phone}</p>}
                </div>
                <div>
                  <textarea
                    style={{ ...styles.input, minHeight: 120, resize: "vertical", borderColor: errors.message ? "#f44336" : undefined }}
                    placeholder="Ваше повідомлення"
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); clearError("message"); }}
                  />
                  {errors.message && <p style={styles.error}>{errors.message}</p>}
                </div>
                {status === "error" && (
                  <p style={{ ...styles.error, textAlign: "center" }}>
                    Помилка відправки. Спробуйте ще раз.
                  </p>
                )}
                <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Відправка..." : "Надіслати"}
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
  error: {
    color: "#f44336",
    fontSize: "0.8rem",
    marginTop: 4,
    marginBottom: 0,
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
