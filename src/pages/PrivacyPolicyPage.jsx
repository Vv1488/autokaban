import { Helmet } from "react-helmet-async";

export default function PrivacyPolicyPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Політика конфіденційності — AutoKaban</title>
          <meta
            name="description"
            content="Політика конфіденційності інтернет-магазину AutoKaban. Як ми збираємо, використовуємо та захищаємо ваші персональні дані."
          />
        </Helmet>

        <div className="section-title">
          <h2>Політика конфіденційності</h2>
          <p>Як ми захищаємо ваші дані</p>
        </div>

        <div style={styles.content}>
          <div style={styles.block}>
            <h3>1. Загальні положення</h3>
            <p style={styles.text}>
              Ця Політика конфіденційності описує, як інтернет-магазин
              AutoKaban (далі — «Магазин») збирає, використовує та захищає
              персональні дані користувачів сайту{" "}
              <a href="https://autokaban.vercel.app" style={styles.link}>
                autokaban.vercel.app
              </a>
              .
            </p>
            <p style={styles.text}>
              Користуючись нашим сайтом, ви погоджуєтесь із збором та
              використанням інформації відповідно до цієї політики.
            </p>
          </div>

          <div style={styles.block}>
            <h3>2. Які дані ми збираємо</h3>
            <ul style={styles.list}>
              <li>
                <strong>При оформленні замовлення:</strong> ім'я, номер
                телефону, місто та відділення Нової Пошти для доставки.
              </li>
              <li>
                <strong>Через форму контакту:</strong> ім'я, номер телефону,
                текст повідомлення.
              </li>
              <li>
                <strong>Автоматично:</strong> IP-адреса, тип браузера, дані
                cookies, інформація про відвідані сторінки.
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>3. Для чого ми використовуємо дані</h3>
            <ul style={styles.list}>
              <li>Обробка та виконання замовлень</li>
              <li>Організація доставки через Нову Пошту</li>
              <li>Зв'язок з вами щодо статусу замовлення</li>
              <li>Відповідь на запитання через форму контакту</li>
              <li>Покращення роботи сайту</li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>4. Передача даних третім особам</h3>
            <p style={styles.text}>
              Ми передаємо ваші дані лише для виконання замовлення:
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Нова Пошта</strong> — ім'я, телефон, адреса доставки
                для відправки замовлення.
              </li>
              <li>
                <strong>Платіжні системи</strong> — при оплаті накладеним
                платежем дані обробляються безпосередньо на відділенні Нової
                Пошти.
              </li>
            </ul>
            <p style={styles.text}>
              Ми не продаємо, не орендуємо та не передаємо ваші персональні
              дані іншим особам без вашої згоди.
            </p>
          </div>

          <div style={styles.block}>
            <h3>5. Захист даних</h3>
            <p style={styles.text}>
              Ми використовуємо захищене з'єднання (HTTPS/SSL) для передачі
              даних. Ваша інформація зберігається безпечно і доступна лише
              авторизованому персоналу Магазину.
            </p>
          </div>

          <div style={styles.block}>
            <h3>6. Cookies</h3>
            <p style={styles.text}>
              Сайт використовує cookies для забезпечення коректної роботи
              кошика та збереження налаштувань. Ви можете вимкнути cookies у
              налаштуваннях браузера, проте це може обмежити функціональність
              сайту.
            </p>
          </div>

          <div style={styles.block}>
            <h3>7. Ваші права</h3>
            <p style={styles.text}>Ви маєте право:</p>
            <ul style={styles.list}>
              <li>Отримати інформацію про зібрані про вас дані</li>
              <li>Вимагати видалення ваших персональних даних</li>
              <li>
                Відкликати згоду на обробку даних у будь-який момент
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>8. Контакти</h3>
            <p style={styles.text}>
              З питань щодо вашої приватності звертайтесь:
            </p>
            <ul style={styles.list}>
              <li>
                Telegram:{" "}
                <a href="https://t.me/autokaban" style={styles.link}>
                  @autokaban
                </a>
              </li>
              <li>
                Телефон:{" "}
                <a href="tel:+380980630594" style={styles.link}>
                  +38 (098) 063-05-94
                </a>
              </li>
              <li>Адреса: м. Дніпро, Україна</li>
            </ul>
          </div>

          <p style={{ ...styles.text, textAlign: "center", marginTop: 16 }}>
            Дата останнього оновлення: травень 2026
          </p>
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
  link: {
    color: "var(--orange)",
  },
};
