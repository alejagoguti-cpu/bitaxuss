/**
 * Estilo de referencia: editorial Bitaxus.
 * Alternancia de fondos oscuros y claros como la landing Bitaxus, con acento rojo y titulares BELAMOR.
 */
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import "./Blog.css";
import "./BlogOverrides.css";

const asset = (source: string) => `${import.meta.env.BASE_URL}${source.replace(/^\//, "")}`;
const blogPath = `${import.meta.env.BASE_URL}blog`;
const loginUrl = "https://app.bitaxus.com/login";

const articles = [
  {
    id: "plataformas",
    category: "Global",
    title: "Plataformas, pagos inmediatos y dólares digitales: así está cambiando la forma de recibir ingresos en Latam.",
    summary: "Trabajar con clientes en el exterior abre oportunidades, pero también nuevas preguntas sobre cobros, tasas y control de tu operación.",
    image: "/blog/plataformas-pagos.webp",
    featured: true,
  },
  {
    id: "exterior",
    category: "Global",
    title: "Si recibes pagos del exterior, guarda esto antes de mover tu dinero",
    summary: "Qué revisar antes de mover recursos que llegan desde otros países y mantener claridad sobre la operación.",
    image: "/blog/pagos-exterior.webp",
  },
  {
    id: "primer-pago",
    category: "Emprendimiento",
    title: "Tu primer pago internacional: qué revisar antes de decirle sí al cliente.",
    summary: "Una guía para dar el siguiente paso cuando tu negocio empieza a trabajar con el exterior.",
    image: "/blog/primer-pago.webp",
  },
  {
    id: "tasa",
    category: "Control de negocio",
    title: "La tasa que ves en Google no es la que llega a tu bolsillo",
    summary: "Entender la diferencia entre una referencia de mercado y el valor final que recibe tu operación.",
    image: "/blog/tasa-google.webp",
  },
];

const categories = ["Todos", "Flujo de Caja", "Pagos y Cobros", "Estrategia"];

const whatsappFeature = {
  id: "whatsapp-feature",
  category: "Pagos y Cobros",
  title: "Mover dinero desde WhatsApp: cómo saber si el canal es confiable",
  summary: "Una guía para entender qué señales revisar antes de mover dinero por un canal de mensajería.",
  image: "/blog-whatsapp-feature-header.webp?v=2",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null);
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  useEffect(() => {
    document.title = "Blog Bitaxus | Ideas para entender mejor tu negocio";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", "Historias, aprendizajes y herramientas de Bitaxus para entender mejor los cobros, pagos y el crecimiento de tu negocio.");
  }, []);

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryMatches = activeCategory === "Todos"
        || (activeCategory === "Flujo de Caja" && article.category === "Control de negocio")
        || (activeCategory === "Pagos y Cobros" && article.category === "Global")
        || (activeCategory === "Estrategia" && article.category === "Emprendimiento");
      const searchMatches = !normalizedQuery || `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [activeCategory, query]);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterMessage(email.includes("@") ? "Gracias. Te avisaremos cuando haya nuevas ideas de Bitaxus." : "Ingresa un correo válido para suscribirte.");
  };

  return (
    <main className="blog-page">
      <section className="blog-native-hero" aria-labelledby="blog-hero-title" data-node-id="2495-2">
        <div className="blog-native-shell">
          <header className="blog-native-nav">
            <a className="blog-native-logo" href={asset("/")} aria-label="Bitaxus, ir al inicio"><img src={asset("/2166-3795.webp")} width="190" height="54" alt="Bitaxus" /></a>
            <nav className="blog-native-nav-links" aria-label="Navegación principal"><a href={asset("/")}>Inicio <ChevronDown /></a><a href={`${asset("/")}#empresas`}>Empresas <ChevronDown /></a><a href={`${asset("/")}#personas`}>Personas <ChevronDown /></a><a className="active" href={blogPath}>Blog <ChevronDown /></a><a href={`${asset("/")}#contacto`}>Ayuda <ChevronDown /></a></nav>
            <div className="blog-native-actions"><a href={loginUrl}>Iniciar sesión</a><a href={`${asset("/")}#contacto`}>Hablemos <ArrowRight /></a></div>
          </header>
          <div className="blog-native-grid">
            <div className="blog-native-copy">
              <h1 id="blog-hero-title">Entender mejor<br />tu negocio también<br />es parte de<br /><span>hacerlo crecer.</span></h1>
              <p>Historias, aprendizajes y herramientas para entender mejor lo que pasa con tus clientes, tus cobros, tu operación y tu crecimiento.</p>
              <label className="blog-native-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar guías o artículos…" aria-label="Buscar guías o artículos" /></label>
              <div className="blog-native-filters" aria-label="Filtrar publicaciones">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? "active" : ""}>{category}</button>)}</div>
            </div>
            <article className="blog-native-feature">
              <img src={asset(whatsappFeature.image)} width="556" height="308" fetchPriority="high" decoding="async" alt="Mover dinero desde WhatsApp: cómo saber si el canal es confiable." />
              <div className="blog-native-feature-footer"><button type="button" onClick={() => setSelectedArticle(whatsappFeature)}>Leer ahora <ArrowRight /></button></div>
            </article>
          </div>
        </div>
      </section>

      <section className="blog-section blog-latest">
        <div className="blog-shell">
          <div className="blog-section-head left"><p className="blog-eyebrow muted">Lo último</p><h2>Lecturas para tener más claridad.</h2></div>
          {visibleArticles.length ? <div className="blog-card-grid">{visibleArticles.filter((article) => !article.featured).map((article) => <ArticleCard key={article.id} article={article} onRead={() => setSelectedArticle(article)} />)}</div> : <div className="blog-empty"><p>No encontramos artículos con esa búsqueda.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); }}>Ver todos los artículos</button></div>}
        </div>
      </section>

      <section className="blog-section blog-capsules">
        <div className="blog-shell">
          <div className="blog-section-head"><p className="blog-eyebrow">Explora por cápsulas</p><h2>Cuatro formas de mirar tu negocio</h2><p>Cada cápsula reúne los temas que más importan según el momento en el que estás.</p></div>
          <div className="blog-capsule-grid">
            <Capsule number="01" title="Control de negocio" copy="Entiende mejor lo que pasa dentro de tu operación." active onClick={() => setActiveCategory("Control de negocio")} />
            <Capsule number="02" title="Emprendimiento" copy="Crecer también cambia la forma de manejar tu empresa." onClick={() => setActiveCategory("Emprendimiento")} />
            <Capsule number="03" title="Clientes y ventas" copy="Vender es solo una parte. Cobrar y mantener la relación también cuenta." onClick={() => setActiveCategory("Clientes y ventas")} />
            <Capsule number="04" title="Global" copy="Cuando tu negocio cruza fronteras, aparecen nuevas preguntas." onClick={() => setActiveCategory("Global")} />
          </div>
        </div>
      </section>

      <section className="blog-section blog-global">
        <div className="blog-shell">
          <div className="blog-section-head left"><p className="blog-eyebrow">Bitaxus Global</p><h2>Cuando tu negocio cruza fronteras, hay mucho más que entender.</h2></div>
          <div className="blog-global-layout">
            <ArticleCard article={articles[0]} variant="wide" onRead={() => setSelectedArticle(articles[0])} />
            <div className="blog-global-list">
              {articles.slice(1).map((article) => <button className="blog-list-article" type="button" key={article.id} onClick={() => setSelectedArticle(article)}><span>{article.category}</span><strong>{article.title}</strong><ArrowRight /></button>)}
              <button className="blog-list-article" type="button" onClick={() => setSelectedArticle(articles[2])}><span>Global</span><strong>Operar en varias monedas sin perder el control de tu caja</strong><ArrowRight /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section blog-experience">
        <div className="blog-shell blog-experience-grid">
          <div><p className="blog-eyebrow">Desde la experiencia</p><h2>Muchos de estos temas empezaron antes de Bitaxus.</h2><p>Buena parte de lo que escribimos nace de situaciones reales que hemos visto acompañando empresas y emprendedores: negocios que crecían más rápido de lo que podían controlar, cobros que se enredaban y decisiones que se tomaban sin la información completa.</p><div className="blog-author"><span>AT</span><p><b>Alejandra Torres</b><small>Fundadora de Bitaxus</small></p></div></div>
          <div className="blog-experience-cards">{["Lo que aprendí acompañando negocios que crecían más rápido de lo que podían controlar", "El día que entendí por qué facturar no es lo mismo que recibir", "Cobrar bien no es incomodar: cómo lo aprendí como consultora"].map((title, index) => <button key={title} type="button" onClick={() => setSelectedArticle(articles[index + 1] || articles[0])}><span>0{index + 1}</span><strong>{title}</strong><ArrowRight /></button>)}</div>
        </div>
      </section>

      <section className="blog-section blog-explains">
        <div className="blog-shell"><div className="blog-section-head"><p className="blog-eyebrow">Bitaxus explica</p><h2>Hay cosas que suenan complicadas hasta que alguien las explica bien.</h2></div><div className="blog-explains-grid">{["¿Qué es la tesorería de una empresa?", "¿Qué diferencia hay entre facturado y recibido?", "¿Qué es cartera?", "¿Qué significa trazabilidad de un pago?"].map((title, index) => <button key={title} type="button" onClick={() => setSelectedArticle(articles[index % articles.length])}><span>0{index + 1}</span><strong>{title}</strong><ArrowRight /></button>)}</div></div>
      </section>

      <section className="blog-section blog-news-section"><div className="blog-shell"><div className="blog-news"><div><p className="blog-eyebrow">Ideas de Bitaxus</p><h2>Ideas para entender mejor el negocio que estás construyendo.</h2><p>Recibe nuevos artículos, aprendizajes y guías de Bitaxus.</p></div><form onSubmit={submitNewsletter}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@empresa.com" aria-label="Correo electrónico" /><button type="submit">Suscribirme <ArrowRight /></button><small role="status">{newsletterMessage || "Al suscribirte, aceptas nuestra política de privacidad."}</small></form></div></div></section>

      <section className="blog-product-cta"><div className="blog-shell"><h2>Leerlo ayuda. Tenerlo claro todos los días, más.</h2><p>Bitaxus está construyendo una experiencia para ayudarte a mantener más contexto sobre tus cobros, pagos y movimientos mientras tu negocio crece.</p><a href={asset("/")} className="blog-primary-cta">Conocer Bitaxus <ArrowRight /></a></div></section>

      <HomeFooter />

      {selectedArticle && <div className="blog-dialog-backdrop" role="presentation" onMouseDown={() => setSelectedArticle(null)}><article className="blog-dialog" role="dialog" aria-modal="true" aria-label={selectedArticle.title} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="blog-dialog-close" aria-label="Cerrar artículo" onClick={() => setSelectedArticle(null)}><X /></button><img src={asset(selectedArticle.image)} alt="" /><p className="blog-eyebrow">{selectedArticle.category}</p><h2>{selectedArticle.title}</h2><p>{selectedArticle.summary}</p><a href={`${asset("/")}#contacto`} className="blog-primary-cta" onClick={() => setSelectedArticle(null)}>Hablemos <ArrowRight /></a></article></div>}
    </main>
  );
}

function ArticleCard({ article, variant = "standard", onRead }: { article: (typeof articles)[number]; variant?: "standard" | "featured" | "wide"; onRead: () => void }) {
  return <article className={`blog-article-card ${variant}`}><img src={asset(article.image)} width="1672" height="941" loading={variant === "featured" ? "eager" : "lazy"} fetchPriority={variant === "featured" ? "high" : "auto"} decoding="async" alt="" /><div className="blog-card-shade" /><div className="blog-article-copy"><h3 className="sr-only">{article.title}</h3><p className="blog-eyebrow">{article.category}</p><button type="button" onClick={onRead}>Leer artículo <ArrowRight /></button></div></article>;
}

function Capsule({ number, title, copy, active = false, onClick }: { number: string; title: string; copy: string; active?: boolean; onClick: () => void }) {
  return <button type="button" className={`blog-capsule ${active ? "active" : ""}`} onClick={onClick}><span>{number}</span><strong>{title}</strong><p>{copy}</p><i>Explorar <ArrowRight /></i></button>;
}

function HomeFooter() {
  const destinations: Record<string, string> = { "Inicio": asset("/"), "Empresas": `${asset("/")}#empresas`, "Personas": `${asset("/")}#personas`, "Bitaxus Global": `${asset("/")}#global`, "Pioneros": `${asset("/")}#pioneros`, "Blog": blogPath, "Ayuda": `${asset("/")}#contacto`, "Recaudos": `${asset("/")}#tecnologia`, "Pagos y dispersiones": `${asset("/")}#tecnologia`, "Integraciones API": `${asset("/")}#tecnologia`, "Orquestación": `${asset("/")}#tecnologia`, "Agente Bitaxus": `${asset("/")}#agente`, "Iniciar sesión": loginUrl };
  const FooterColumn = ({ title, links }: { title: string; links: string[] }) => <div className="footer-column"><h4>{title}</h4>{links.map((link) => <a href={destinations[link] || `${asset("/")}#contacto`} key={link}>{link}</a>)}</div>;
  return <footer className="footer" data-node-id="2166-3789"><div className="content-frame footer-top"><div className="footer-brand"><img src={asset("/2166-3795.webp")} width="105" height="30" loading="lazy" decoding="async" alt="Bitaxus" /><h3>Tu operación,<br />conectada.</h3><p>Bitaxus facilita y coordina servicios de recaudo, pagos y dispersión mediante aliados, proveedores y canales habilitados.</p><div className="social-row"><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3804.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3807.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3810.svg")} loading="lazy" decoding="async" alt="" /></a></div></div><FooterColumn title="Explora" links={["Inicio", "Empresas", "Personas", "Bitaxus Global", "Pioneros", "Blog", "Ayuda"]} /><FooterColumn title="Producto" links={["Recaudos", "Pagos y dispersiones", "Integraciones API", "Orquestación", "Agente Bitaxus", "Iniciar sesión"]} /><FooterColumn title="Legal" links={["Términos y condiciones de uso", "Tratamiento y protección de datos", "Privacidad y uso de cookies", "Términos del programa Pioneros", "Peticiones, consultas y reclamos"]} /><FooterColumn title="Confianza" links={["Seguridad en Bitaxus", "Cumplimiento y controles", "Línea ética", "Reportar una vulnerabilidad"]} /><div className="footer-column contact"><h4>Contacto</h4><b>Bitaxus S.A.S.</b><a href="mailto:support@bitaxus.com">support@bitaxus.com</a><a href="tel:+573213816103">+57 321 381 6103</a><span>Lun - Vie: 8am - 6pm</span><span>Medellín, Colombia</span></div></div><div className="content-frame footer-bottom"><p>Bitaxus es una compañía de tecnología, no una entidad financiera. Los servicios de billetera, tarjetas y transferencias son operados por entidades financieras autorizadas y vigiladas por la Superintendencia Financiera de Colombia o sus equivalentes en otras jurisdicciones. Bitaxus actúa como un orquestador tecnológico para facilitar la gestión financiera de sus usuarios.</p><div><span>© 2026 Bitaxus S.A.S. Todos los derechos reservados.</span><a href={loginUrl}>Iniciar sesión</a></div></div></footer>;
}
