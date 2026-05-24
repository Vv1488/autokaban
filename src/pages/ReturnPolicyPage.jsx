import { Helmet } from "react-helmet-async";

export default function ReturnPolicyPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Повернення та обмін — AutoKaban</title>
          <meta
            name="description"
            content="Умови повернення та обміну товарів в інтернет-магазині AutoKaban. 14 днів на повернення, проста процедура."
          />
        </Helmet>

        <div className="section-title">
          <h2>Повернення та обмін</h2>
          <p>Умови повернення товару</p>
        </div>

        <div style={styles.content}>
          <div style={styles.block}>
            <h3>Право на повернення</h3>
            <p style={styles.text}>
              Відповідно до Закону України «Про захист прав споживачів», ви
              маєте право повернути товар протягом <strong>14 днів</strong> з
              моменту отримання замовлення, якщо він вам не підійшов.
            </p>
          </div>

          <div style={styles.block}>
            <h3>Умови повернення</h3>
            <ul style={styles.list}>
              <li>
                Товар не був у використанні та зберіг свій товарний вигляд
              </li>
              <li>Збережена оригінальна упаковка</li>
              <li>
                Збережені всі комплектуючі, ярлики та документи
              </li>
              <li>
                Збережено касовий або товарний чек (наявність чека бажана, але
                не обов'язкова)
              </li>
            </ul>
          </div>

          <div style={styles.block}>
            <h3>Як оформити повернення</h3>
            <ol style={styles.list}>
              <li>
                Зв'яжіться з нами через{" "}
                <a href="https://t.me/autokaban" style={styles.link}>
                  Telegram
                </a>{" "}
                або за телефоном{" "}
                <a href="tel:+380980630594" style={styles.link}>
                  +38 (098) 063-05-94
                </a>
              </li>
              <li>Повідомте номер замовлення та причину повернення</li>
              <li>
                Ми надамо адресу для відправки товару Новою Поштою
              </li>
              <li>
                Після отримання та перевірки товару ми повернемо кошти
                протягом 5 робочих днів
              </li>
            </ol>
          </div>

          <div style={styles.block}>
            <h3>Повернення коштів</h3>
            <p style={styles.text}>
              Кошти повертаються тим же способом, яким було здійснено оплату.
              При оплаті накладеним платежом повернення здійснюється на карту
              банку після надання реквізитів.
            </p>
            <p style={styles.text}>
              Вартість зворотної доставки оплачує покупець.
            </p>
          </div>

          <div style={styles.block}>
            <h3>Обмін товару</h3>
            <p style={styles.text}>
              Якщо ви хочете обміняти товар на інший, зв'яжіться з нами.
              Обмін можливий за умови, що товар відповідає умовам повернення,
              зазначеним вище. Різницю у вартості доплачує або отримує
              покупець.
            </p>
          </div>

          <div style={styles.block}>
            <h3>Пошкоджений або бракований товар</h3>
            <p style={styles.text}>
              Якщо ви отримали пошкоджений або бракований товар — негайно
              зв'яжіться з нами. Ми замінимо товар або повернемо кошти.
              Вартість доставки в такому випадку ми беремо на себе.
            </p>
            <p style={styles.text}>
              Важливо: перевіряйте товар при отриманні на відділенні Нової
              Пошти. Якщо є пошкодження — складіть акт про пошкодження прямо
              на відділенні.
            </p>
          </div>

          <div style={styles.block}>
            <h3>Товари, що не підлягають поверненню</h3>
            <p style={styles.text}>
              Відповідно до законодавства, товари персонального використання
              та товари, що були у вживанні зі слідами експлуатації, поверненню
              не підлягають.
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
  link: {
    color: "var(--orange)",
  },
};
