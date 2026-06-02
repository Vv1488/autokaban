import { Helmet } from "react-helmet-async";

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Умови використання — AutoKaban</title>
          <meta
            name="description"
            content="Умови використання інтернет-магазину AutoKaban. Правила оформлення замовлень, оплати та доставки."
          />
        </Helmet>

        <div className="section-title">
          <h2>Умови використання</h2>
          <p>Правила користування інтернет-магазином</p>
        </div>

        <div style={styles.content}>
          <div style={styles.block}>
            <h3>1. Загальні положення</h3>
            <p style={styles.text}>
              Інтернет-магазин AutoKaban (далі — «Магазин») розташований за
              адресою{" "}
              <a href="https://autokaban.store" style={styles.link}>
                autokaban.store
              </a>
              . Користуючись сайтом, ви погоджуєтесь із цими умовами.
            </p>
            <p style={styles.text}>
              Магазин залишає за собою право змінювати ці умови без
              попередження. Рекомендуємо періодично переглядати цю сторінку.
            </p>
          </div>

          <div style={styles.block}>
            <h3>2. Оформлення замовлення</h3>
            <ul style={styles.list}>
              <li>
                Замовлення оформлюється через кошик на сайті або через
                Telegram-бот
              </li>
              <li>
                Для оформлення необхідно вказати: ім'я, номер телефону, місто
                та відділення Нової Пошти
              </li>
              <li>
                Після оформлення замовлення ми зв'яжемось з вами для
                підтвердження
              </li>
              <li>
                Магазин має право відхилити замовлення з об'єктивних причин
                (відсутність товару, технічна помилка тощо)
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>3. Ціни та оплата</h3>
            <ul style={styles.list}>
              <li>Усі ціни вказані у гривнях (UAH) з урахуванням ПДВ</li>
              <li>
                Оплата здійснюється при отриманні товару на відділенні Нової
                Пошти (накладений платіж)
              </li>
              <li>
                Магазин залишає за собою право змінювати ціни без попереднього
                повідомлення
              </li>
              <li>
                Ціна на момент оформлення замовлення є остаточною і не може
                бути змінена
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>4. Доставка</h3>
            <ul style={styles.list}>
              <li>Доставка здійснюється Новою Поштою по всій Україні</li>
              <li>Відправка замовлення — протягом 1-2 робочих днів</li>
              <li>
                Вартість доставки вказується при оформленні замовлення
              </li>
              <li>
                Термін доставки залежить від регіону та становить зазвичай 1-3
                дні
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>5. Гарантії та відповідальність</h3>
            <p style={styles.text}>
              Магазин гарантує, що всі товари є новими та відповідають
              опису на сайті. Якщо отриманий товар не відповідає опису,
              ми замінимо його або повернемо кошти.
            </p>
            <p style={styles.text}>
              Магазин не несе відповідальності за затримки доставки, що
              виникли з вини перевізника (Нової Пошти).
            </p>
          </div>

          <div style={styles.block}>
            <h3>6. Інтелектуальна власність</h3>
            <p style={styles.text}>
              Усі матеріали сайту (тексти, зображення, дизайн, логотип) є
              власністю AutoKaban. Використання матеріалів без письмової згоди
              заборонено.
            </p>
          </div>

          <div style={styles.block}>
            <h3>7. Контакти</h3>
            <p style={styles.text}>
              З питань щодо замовлень та умов придбання звертайтесь:
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
