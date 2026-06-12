import { Helmet } from "react-helmet-async";

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Про нас — AutoKaban</title>
          <meta name="description" content="Інтернет-магазин автоаксесуарів AutoKaban. Інформація про магазин, власника, доставку та оплату." />
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
              надійних українських постачальників, щоб ваш автомобіль завжди був у
              ідеальному стані.
            </p>
          </div>

          <div style={styles.block}>
            <h3>👤 Власник та контактна особа</h3>
            <p style={styles.text}>
              <strong>Місюра Виталій Анатолійович</strong> — фізична особа-підприємець.
            </p>
            <p style={styles.text}>
              Місце діяльності: м. Дніпро, Україна.
            </p>
            <p style={styles.text}>
              Телефон: <a href="tel:+380980630594" style={styles.orangeLink}>+38 (098) 063-05-94</a><br />
              Email: <a href="mailto:vitalijmisura316@gmail.com" style={styles.orangeLink}>vitalijmisura316@gmail.com</a><br />
              Telegram: <a href="https://t.me/autokaban" target="_blank" rel="noopener noreferrer" style={styles.orangeLink}>@autokaban</a>
            </p>
          </div>

          <div style={styles.block}>
            <h3>📦 Як ми працюємо</h3>
            <p style={styles.text}>
              AutoKaban працює за моделлю прямої доставки (дропшипінг). Ми співпрацюємо
              з перевіреними українськими постачальниками та складами. Коли ви оформлюєте
              замовлення на нашому сайті, ми передаємо його постачальнику, який
              безпосередньо відправляє товар вам через Нову Пошту.
            </p>
            <p style={styles.text}>
              Це дозволяє нам пропонувати найнижчі ціни без націнок на зберігання та
              логістику складу. Ви отримуєте товар напряму від постачальника з нашою
              гарантією підтримки.
            </p>
          </div>

          <div style={styles.block}>
            <h3>🚚 Доставка</h3>
            <p style={styles.text}>
              Відправляємо замовлення Новою Поштою по всій Україні. Відправка
              протягом 1-3 робочих днів після оформлення замовлення.
              Ви отримуєте трек-номер для відстеження посилки.
            </p>
          </div>

          <div style={styles.block}>
            <h3>💰 Оплата</h3>
            <p style={styles.text}>
              Оплата при отриманні замовлення на відділенні Нової Пошти
              (накладений платіж). Жодних передоплат — ви оплачуєте товар
              лише коли він у вас в руках.
            </p>
          </div>

          <div style={styles.block}>
            <h3>🔄 Повернення та обмін</h3>
            <p style={styles.text}>
              Якщо товар вам не підійшов — повернення протягом 14 днів з моменту
              отримання. Товар має бути в оригінальній упаковці та без слідів
              використання. Детальніше на сторінці{" "}
              <a href="/returns" style={styles.orangeLink}>Повернення та обмін</a>.
            </p>
          </div>

          <div style={styles.block}>
            <h3>📞 Підтримка клієнтів</h3>
            <p style={styles.text}>
              Графік роботи: Пн-Сб, 09:00 — 18:00.
            </p>
            <p style={styles.text}>
              Маєте питання щодо товару, доставки або повернення? Зв'яжіться з нами
              зручним способом — через <a href="https://t.me/autokaban" target="_blank" rel="noopener noreferrer" style={styles.orangeLink}>Telegram</a>,
              {" "}по <a href="tel:+380980630594" style={styles.orangeLink}>телефону</a> або
              {" "}<a href="/contacts" style={styles.orangeLink}>через форму на сайті</a>.
            </p>
          </div>

          <div style={{ ...styles.block, background: "var(--bg)" }}>
            <h3>📋 Дані магазину</h3>
            <p style={styles.text}>
              <strong>Назва:</strong> AutoKaban<br />
              <strong>Власник:</strong> Місюра Виталій Анатолійович<br />
              <strong>Адреса:</strong> вул. Минина 11, м. Дніпро, 49000, Україна<br />
              <strong>Телефон:</strong> +38 (098) 063-05-94<br />
              <strong>Email:</strong> vitalijmisura316@gmail.com<br />
              <strong>Telegram:</strong> @autokaban
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
  orangeLink: {
    color: "var(--orange)",
    textDecoration: "none",
    fontWeight: 600,
  },
};
