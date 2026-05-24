import { Helmet } from "react-helmet-async";

export default function ShippingPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Доставка та оплата — AutoKaban</title>
          <meta
            name="description"
            content="Доставка Новою Поштою по всій Україні. Оплата при отриманні (накладений платіж). Швидка відправка замовлень."
          />
        </Helmet>

        <div className="section-title">
          <h2>Доставка та оплата</h2>
          <p>Усе про доставку та способи оплати</p>
        </div>

        <div style={styles.content}>
          <div style={styles.block}>
            <h3>Доставка Новою Поштою</h3>
            <p style={styles.text}>
              Ми відправляємо всі замовлення службою доставки «Нова Пошта»
              по всій Україні.
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Куди:</strong> у будь-яке відділення або поштомат Нової
                Пошти в Україні
              </li>
              <li>
                <strong>Термін відправки:</strong> 1-2 робочих дні після
                оформлення замовлення
              </li>
              <li>
                <strong>Термін доставки:</strong> зазвичай 1-3 дні залежно від
                регіону
              </li>
              <li>
                <strong>Вартість доставки:</strong> розраховується автоматично
                при оформленні замовлення згідно з тарифами Нової Пошти
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>Оплата при отриманні</h3>
            <p style={styles.text}>
              Ми працюємо за системою накладеного платежу — ви оплачуєте
              товар безпосередньо при отриманні на відділенні Нової Пошти.
            </p>
            <ul style={styles.list}>
              <li>
                <strong>Жодних передоплат</strong> — оплачуєте лише коли товар
                у вас в руках
              </li>
              <li>
                <strong>Оплата готівкою або карткою</strong> — на вибір, при
                отриманні на відділенні
              </li>
              <li>
                <strong>Комісія за накладений платіж</strong> — згідно з
                тарифами Нової Пошти
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>Як оформити замовлення</h3>
            <ol style={styles.list}>
              <li>Додайте потрібні товари у кошик</li>
              <li>Перейдіть до оформлення замовлення</li>
              <li>Заповніть дані: ім'я, телефон, місто та відділення Нової Пошти</li>
              <li>Підтвердіть замовлення</li>
              <li>
                Ми зв'яжемось з вами для підтвердження та відправимо товар
              </li>
            </ol>
          </div>

          <div style={styles.block}>
            <h3>Перевірка товару</h3>
            <p style={styles.text}>
              Рекомендуємо перевіряти товар при отриманні на відділенні Нової
              Пошти. Якщо товар пошкоджено — складіть акт про пошкодження
              безпосередньо на відділенні та зв'яжіться з нами. Ми замінимо
              товар або повернемо кошти.
            </p>
          </div>

          <div style={styles.block}>
            <h3>Маєте питання?</h3>
            <p style={styles.text}>
              Зв'яжіться з нами — ми завжди раді допомогти:
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
              <li>Графік роботи: Пн-Сб, 09:00 — 18:00</li>
            </ul>
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
  link: {
    color: "var(--orange)",
  },
};
