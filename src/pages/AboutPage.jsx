import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Про нас — AutoKaban</title>
          <meta name="description" content="Про інтернет-магазин автоаксесуарів AutoKaban. Наші переваги, доставка та оплата." />
        </Helmet>
        <div className="section-title">
          <h2>Про нас</h2>
          <p>AutoKaban — ваш надійний помічник у світі автоаксесуарів</p>
        </div>

        <div style={styles.content}>
          <div style={styles.block}>
            <h3>🚗 Хто ми?</h3>
            <p style={styles.text}>
              AutoKaban — інтернет-магазин автоаксесуарів та гаджетів для
              автомобілістів. Ми обираємо тільки якісні та перевірені товари від
              надійних постачальників, щоб ваш автомобіль завжди був у
              ідеальному стані.
            </p>
          </div>

          <div style={styles.block}>
            <h3>📦 Доставка</h3>
            <p style={styles.text}>
              Відправляємо замовлення Новою Поштою по всій
              Україні. Відправка протягом 1-2 робочих днів після оформлення
              замовлення.
            </p>
          </div>

          <div style={styles.block}>
            <h3>💰 Оплата</h3>
            <p style={styles.text}>
              Оплата при отриманні замовлення на відділенні Нової Пошти (накладений платіж). Жодних передоплат — оплачуєте товар лише коли він у вас в руках.
            </p>
          </div>

          <div style={styles.block}>
            <h3>🔄 Повернення</h3>
            <p style={styles.text}>
              Якщо товар вам не підійшов — повернення протягом 14 днів з моменту
              отримання. Товар має бути в оригінальній упаковці та без слідів
              використання.
            </p>
          </div>

          <div style={styles.block}>
            <h3>📞 Підтримка</h3>
            <p style={styles.text}>
              Маєте питання? Зв'яжіться з нами через Telegram або зателефонуйте.
              Ми завжди раді допомогти з вибором товару!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  content: {
    maxWidth: 800,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  block: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius)",
    padding: 24,
  },
  text: {
    color: "var(--text)",
    lineHeight: 1.7,
    marginTop: 8,
  },
  list: {
    color: "var(--text)",
    lineHeight: 1.8,
    paddingLeft: 20,
    marginTop: 8,
  },
};
