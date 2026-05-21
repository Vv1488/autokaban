import { useState, useRef } from "react";

const BOT_TOKEN = "8997330539:AAEYlHL8hq9kqY20pDBrgcMqEH4tshtWvPo";
const CHAT_ID = "7541394049";
const NP_API = "https://api.novaposhta.ua/v2.0/json/";
const NP_KEY = "d23de792fea9e5082f03a7a4fa8ab393";

export default function OrderForm({ cart, totalPrice, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cityRef: "",
    cityName: "",
    warehouseRef: "",
    warehouseName: "",
    payment: "cod",
  });
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWH, setLoadingWH] = useState(false);
  const [status, setStatus] = useState("idle");
  const cityTimer = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const searchCities = async (query) => {
    if (query.length < 2) {
      setCities([]);
      setShowCities(false);
      return;
    }
    setLoadingCities(true);
    try {
      const res = await fetch(NP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: NP_KEY,
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: { FindByString: query, Limit: 10 },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCities(data.data.map((c) => ({ Ref: c.Ref, Present: c.Description })));
        setShowCities(true);
      }
    } catch {
      setCities([]);
    }
    setLoadingCities(false);
  };

  const selectCity = async (city) => {
    setForm((f) => ({
      ...f,
      cityRef: city.Ref,
      cityName: city.Present,
      warehouseRef: "",
      warehouseName: "",
    }));
    setShowCities(false);
    setCities([]);
    setLoadingWH(true);
    try {
      const res = await fetch(NP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: NP_KEY,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: city.Ref,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setWarehouses(data.data);
      }
    } catch {
      setWarehouses([]);
    }
    setLoadingWH(false);
  };

  const onCityInput = (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, cityName: val, cityRef: "", warehouseRef: "", warehouseName: "" }));
    setWarehouses([]);
    clearTimeout(cityTimer.current);
    cityTimer.current = setTimeout(() => searchCities(val), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name}\n  ${item.quantity} шт × ${item.price} грн = ${item.price * item.quantity} грн\n  🔗 autokaban.vercel.app/product/${item.id}`
      )
      .join("\n\n");

    const orderText = `
🛒 Нове замовлення AutoKaban!

📋 Товари:
${itemsText}

💰 Сума: ${totalPrice} грн

👤 Клієнт:
Ім'я: ${form.name}
Телефон: ${form.phone}
Доставка: Нова Пошта
Місто: ${form.cityName}
Відділення: ${form.warehouseName}
Оплата: Накладений платіж
`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: orderText,
          }),
        }
      );

      if (res.ok) {
        setStatus("sent");
        onSuccess();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: 20, color: "#4caf50" }}>
        <p style={{ fontSize: "2rem" }}>✅</p>
        <h3>Замовлення відправлено!</h3>
        <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
          Ми зв'яжемося з вами найближчим часом.
        </p>
      </div>
    );
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h4 style={{ color: "#fff", marginBottom: 8 }}>Оформити замовлення</h4>

      <input
        style={styles.input}
        type="text"
        name="name"
        placeholder="Ім'я та прізвище"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        style={styles.input}
        type="tel"
        name="phone"
        placeholder="Номер телефону"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <div style={styles.deliveryBadge}>
        📦 Доставка Новою Поштою по всій Україні
      </div>

      {/* City search */}
      <div style={styles.autocomplete}>
        <input
          style={styles.input}
          type="text"
          placeholder="Почніть вводити місто..."
          value={form.cityName}
          onChange={onCityInput}
          onFocus={() => cities.length > 0 && setShowCities(true)}
          onBlur={() => setTimeout(() => setShowCities(false), 200)}
          required
        />
        {loadingCities && (
          <span style={styles.loader}>⏳</span>
        )}
        {showCities && cities.length > 0 && (
          <div style={styles.dropdown}>
            {cities.map((city) => (
              <div
                key={city.Ref}
                style={styles.dropdownItem}
                onMouseDown={() => selectCity(city)}
              >
                {city.Present}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warehouse select */}
      {form.cityRef && (
        loadingWH ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", padding: "8px 0" }}>
            Завантаження відділень...
          </p>
        ) : (
          <select
            style={styles.select}
            value={form.warehouseRef}
            onChange={(e) => {
              const wh = warehouses.find((w) => w.Ref === e.target.value);
              setForm((f) => ({
                ...f,
                warehouseRef: wh.Ref,
                warehouseName: wh.Description,
              }));
            }}
            required
          >
            <option value="">Оберіть відділення</option>
            {warehouses.map((wh) => (
              <option key={wh.Ref} value={wh.Ref}>
                {wh.Description}
              </option>
            ))}
          </select>
        )
      )}

      <div style={styles.deliveryBadge}>
        💳 Оплата при отриманні (накладений платіж)
      </div>

      {status === "error" && (
        <p style={{ color: "#f44336", fontSize: "0.9rem" }}>
          Помилка відправки. Спробуйте ще раз.
        </p>
      )}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
        style={{ width: "100%", marginTop: 8 }}
      >
        {status === "sending" ? "Відправка..." : `Замовити на ${totalPrice} грн`}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "12px 0",
    borderTop: "1px solid var(--border)",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "#fff",
    outline: "none",
    fontSize: "0.95rem",
    boxSizing: "border-box",
  },
  deliveryBadge: {
    background: "var(--bg-card)",
    color: "var(--text-muted)",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    fontSize: "0.9rem",
    textAlign: "center",
    border: "1px solid var(--border)",
  },
  autocomplete: {
    position: "relative",
  },
  loader: {
    position: "absolute",
    right: 12,
    top: 10,
    fontSize: "1rem",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#1a1a1a",
    border: "1px solid var(--border)",
    borderRadius: "0 0 var(--radius-sm) var(--radius-sm)",
    maxHeight: 200,
    overflowY: "auto",
    zIndex: 100,
  },
  dropdownItem: {
    padding: "10px 14px",
    color: "var(--text)",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "#fff",
    outline: "none",
    fontSize: "0.9rem",
  },
};
