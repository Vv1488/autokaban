import { useState } from "react";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    q: "Як оформити замовлення?",
    a: "Оберіть товар у каталозі, додайте його в кошик, перейдіть до оформлення та заповніть форму доставки. Ми зв'яжемося з вами для підтвердження замовлення.",
  },
  {
    q: "Які способи оплати?",
    a: "Оплата при отриманні на відділенні Нової Пошти (накладений платіж). Ви нічого не платите наперед — лише коли товар у вас в руках.",
  },
  {
    q: "Скільки коштує доставка?",
    a: "Вартість доставки розраховується за тарифами Нової Пошти залежно від ваги та міста призначення. Точну суму ви побачите при оформленні замовлення.",
  },
  {
    q: "Скільки часу займає доставка?",
    a: "Відправка замовлення протягом 1-3 робочих днів. Доставка Новою Поштою зазвичай займає 1-2 дні по Україні.",
  },
  {
    q: "Чи можна повернути товар?",
    a: "Так, повернення протягом 14 днів з моменту отримання. Товар має бути в оригінальній упаковці без слідів використання. Детальніше на сторінці «Повернення та обмін».",
  },
  {
    q: "Звідки приходять товари?",
    a: "Ми співпрацюємо з перевіреними українськими постачальниками. Товари відправляються з їхніх складів напряму вам через Нову Пошту.",
  },
  {
    q: "Чи є гарантія на товари?",
    a: "На всі товари поширюється гарантія відповідно до чинного законодавства України. Якщо товар має заводський дефект — ми замінимо його або повернемо кошти.",
  },
  {
    q: "Як зв'язатися з підтримкою?",
    a: "Напишіть нам у Telegram (@autokaban), зателефонуйте +38 (098) 063-05-94 або залиште заявку на сторінці «Контакти». Графік роботи: Пн-Сб, 09:00-18:00.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.item}>
      <button style={styles.question} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span style={{ ...styles.arrow, transform: open ? "rotate(180deg)" : "none" }}>&#9660;</span>
      </button>
      {open && <p style={styles.answer}>{a}</p>}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="section">
      <div className="container">
        <Helmet>
          <title>Часті питання — AutoKaban</title>
          <meta name="description" content="Часті питання про замовлення, доставку, оплату та повернення в інтернет-магазині автотоварів AutoKaban." />
        </Helmet>
        <div className="section-title">
          <h2>Часті питання</h2>
          <p>Відповіді на найпопулярніші питання</p>
        </div>
        <div style={styles.list}>
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  list: {
    maxWidth: 800,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  item: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  question: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
  },
  arrow: {
    color: "var(--orange)",
    fontSize: "0.7rem",
    transition: "transform 0.2s",
  },
  answer: {
    padding: "0 24px 18px",
    color: "var(--text)",
    lineHeight: 1.7,
    margin: 0,
  },
};
