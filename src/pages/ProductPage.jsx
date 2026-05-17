import { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import products from "../data/products.json";

const SvgChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const SvgChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
);
const SvgClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const SvgZoomIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
);
const SvgZoomOut = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
);

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [hover, setHover] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const block = (e) => e.preventDefault();
    el.addEventListener("touchmove", block, { passive: false });
    return () => el.removeEventListener("touchmove", block);
  }, []);

  const goTo = (index) => {
    const el = scrollRef.current;
    if (!el || isScrolling.current) return;
    const clamped = Math.max(0, Math.min(index, product.images.length - 1));
    isScrolling.current = true;
    setActiveImg(clamped);
    el.scrollTo({ left: clamped * el.offsetWidth, behavior: "smooth" });
    setTimeout(() => { isScrolling.current = false; }, 400);
  };

  const prev = () => goTo(activeImg > 0 ? activeImg - 1 : product.images.length - 1);
  const next = () => goTo(activeImg < product.images.length - 1 ? activeImg + 1 : 0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 30 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 0) prev();
    else next();
  };

  const openLightbox = () => {
    setZoom(1);
    setPos({ x: 0, y: 0 });
    setLightbox(true);
  };

  const closeLightbox = () => {
    setLightbox(false);
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const zoomOut = () => {
    setZoom((z) => Math.max(z - 0.5, 1));
    if (zoom <= 1.5) setPos({ x: 0, y: 0 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragging(false);

  if (!product) {
    return (
      <div className="section container" style={{ textAlign: "center" }}>
        <h2>Товар не знайдено</h2>
        <button onClick={() => navigate(-1)} className="btn btn-primary" style={{ marginTop: 16, cursor: "pointer" }}>
          Повернутися в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <button onClick={() => navigate(-1)} style={{ ...styles.back, cursor: "pointer", border: "none", background: "none", font: "inherit" }}>
          ← Назад в каталог
        </button>

        <div style={styles.layout} data-product-layout>
          <div style={styles.imageSection}>
            <div
              style={styles.gallery}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <div
                ref={scrollRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={styles.carousel}
              >
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className="product-main-img"
                    style={styles.carouselSlide}
                    onClick={openLightbox}
                    draggable={false}
                  />
                ))}
              </div>

              <button
                onClick={openLightbox}
                style={{
                  ...styles.zoomBtn,
                  opacity: hover ? 1 : 0,
                }}
              >
                <SvgZoomIn />
              </button>

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    style={{
                      ...styles.arrow,
                      left: 8,
                      opacity: hover ? 1 : 0,
                    }}
                  >
                    <SvgChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    style={{
                      ...styles.arrow,
                      right: 8,
                      opacity: hover ? 1 : 0,
                    }}
                  >
                    <SvgChevronRight />
                  </button>
                </>
              )}

              <div style={styles.counter}>
                {activeImg + 1} / {product.images.length}
              </div>

              {product.images.length > 1 && (
                <div style={styles.dots}>
                  {product.images.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        ...styles.dot,
                        background: i === activeImg ? "var(--orange)" : "rgba(255,255,255,0.3)",
                      }}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div style={styles.thumbnails}>
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    style={{
                      ...styles.thumb,
                      border: i === activeImg ? "2px solid var(--orange)" : "2px solid var(--border)",
                      opacity: i === activeImg ? 1 : 0.5,
                    }}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={styles.infoSection}>
            <h1 style={styles.title}>{product.name}</h1>

            <div style={styles.prices}>
              <span style={styles.price}>{product.price} грн</span>
              {product.oldPrice && (
                <span style={styles.oldPrice}>{product.oldPrice} грн</span>
              )}
              {product.oldPrice && (
                <span style={styles.discount}>
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <p style={styles.desc}>{product.description}</p>

            {product.features && (
              <div style={styles.features}>
                <h3>Характеристики:</h3>
                <ul>
                  {product.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={styles.stock}>
              {product.inStock ? (
                <span style={{ color: "#4caf50" }}>✅ В наявності</span>
              ) : (
                <span style={{ color: "#f44336" }}>❌ Немає в наявності</span>
              )}
            </div>

            <button
              className="btn btn-primary"
              style={styles.buyBtn}
              onClick={() => addToCart(product)}
            >
              🛒 В кошик — {product.price} грн
            </button>

            <div style={styles.deliveryInfo}>
              <p>🚚 Доставка Новою Поштою по всій Україні</p>
              <p>💰 Оплата: Накладений платіж при отриманні</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          style={styles.lightbox}
          onClick={closeLightbox}
          onWheel={handleWheel}
        >
          <div style={styles.lightboxTop}>
            <span style={styles.lightboxCounter}>
              {activeImg + 1} / {product.images.length}
            </span>
            <div style={styles.lightboxControls}>
              <button onClick={(e) => { e.stopPropagation(); zoomOut(); }} style={styles.lbBtn} disabled={zoom <= 1}>
                <SvgZoomOut />
              </button>
              <span style={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
              <button onClick={(e) => { e.stopPropagation(); zoomIn(); }} style={styles.lbBtn} disabled={zoom >= 3}>
                <SvgZoomIn />
              </button>
              <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} style={styles.lbBtn}>
                <SvgClose />
              </button>
            </div>
          </div>

          <img
            src={product.images[activeImg]}
            alt={product.name}
            style={{
              ...styles.lightboxImg,
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
              transition: dragging ? "none" : "transform 0.2s ease",
              cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            draggable={false}
          />

          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); setZoom(1); setPos({ x: 0, y: 0 }); }}
                style={{ ...styles.lbArrow, left: 24 }}
              >
                <SvgChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); setZoom(1); setPos({ x: 0, y: 0 }); }}
                style={{ ...styles.lbArrow, right: 24 }}
              >
                <SvgChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  back: {
    display: "inline-block",
    marginBottom: 24,
    color: "var(--text-muted)",
    fontSize: "0.95rem",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  gallery: {
    position: "relative",
    background: "var(--bg-card)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
  },
  carousel: {
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
  },
  carouselSlide: {
    minWidth: "100%",
    width: "100%",
    minHeight: 320,
    objectFit: "contain",
    display: "block",
    scrollSnapAlign: "start",
    cursor: "pointer",
  },
  zoomBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.25s, background 0.2s",
  },
  counter: {
    position: "absolute",
    bottom: 10,
    right: 10,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: "0.8rem",
  },
  thumbnails: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
  },
  dots: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  thumb: {
    width: 56,
    height: 56,
    minWidth: 56,
    objectFit: "contain",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 0.2s",
    background: "var(--bg-card)",
    padding: 3,
    boxSizing: "border-box",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
    lineHeight: 1.3,
  },
  prices: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  price: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: 800,
    color: "var(--orange)",
  },
  oldPrice: {
    fontSize: "1.2rem",
    color: "var(--text-muted)",
    textDecoration: "line-through",
  },
  discount: {
    background: "#f44336",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  desc: {
    color: "var(--text)",
    lineHeight: 1.7,
  },
  features: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius-sm)",
    padding: 16,
  },
  stock: {
    fontSize: "0.95rem",
  },
  buyBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "1rem",
  },
  deliveryInfo: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius-sm)",
    padding: 16,
    color: "var(--text-muted)",
    fontSize: "0.9rem",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  // Lightbox
  lightbox: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(0,0,0,0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    zIndex: 2,
  },
  lightboxCounter: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.9rem",
  },
  lightboxControls: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  lbBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  zoomLevel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.8rem",
    minWidth: 40,
    textAlign: "center",
  },
  lightboxImg: {
    maxWidth: "90vw",
    maxHeight: "85vh",
    objectFit: "contain",
  },
  lbArrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
};

const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
  @media (max-width: 768px) {
    [data-product-layout] {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    .product-main-img {
      min-height: 260px !important;
    }
  }
  [data-product-layout] .carousel::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(mobileStyles);
