/**
 * Estilo de referencia: editorial Bitaxus.
 * Alternancia de fondos oscuros y claros como la landing Bitaxus, con acento rojo y titulares BELAMOR.
 */
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import "./Blog.css";
import "./BlogOverrides.css";

import { articles, asset, blogPath, BlogArticle, loginUrl } from "./blogData";

const categories = ["Todos", "Flujo de Caja", "Pagos y Cobros", "Estrategia"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
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
      <header className="blog-nav blog-restore-nav">
        <div className="blog-shell blog-nav-inner">
          <a className="blog-logo" href={asset("/")} aria-label="Bitaxus, ir al inicio"><img src={asset("/2166-3795.webp")} width="117" height="34" alt="Bitaxus" /></a>
          <nav aria-label="Navegación principal"><a href={asset("/")}>Inicio</a><a href={`${asset("/")}#empresas`}>Empresas</a><a href={`${asset("/")}#personas`}>Personas</a><a className="active" href={blogPath}>Blog</a><a href={`${asset("/")}#contacto`}>Ayuda</a></nav>
          <div className="blog-nav-actions"><a href={loginUrl}>Iniciar sesión</a><a className="blog-outline-cta" href={`${asset("/")}#contacto`}>Hablemos <ArrowRight /></a></div>
        </div>
      </header>
      <section className="blog-hero" aria-labelledby="blog-hero-title">
        <div className="blog-shell blog-hero-grid">
          <div className="blog-hero-copy">
            <p className="blog-eyebrow">Bitaxus Blog</p>
            <h1 id="blog-hero-title">Entender mejor tu negocio también es parte de hacerlo <span>crecer.</span></h1>
            <p className="blog-lede">Historias, aprendizajes y herramientas para entender mejor lo que pasa con tus clientes, tus cobros, tu operación y tu crecimiento.</p>
            <label className="blog-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar guías o artículos…" aria-label="Buscar guías o artículos" /></label>
            <div className="blog-filters" aria-label="Filtrar publicaciones">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? "active" : ""}>{category}</button>)}</div>
          </div>
          <ArticleCard article={articles[0]} variant="featured" onRead={() => setLocation(`${blogPath}/article/${articles[0].id}`)} />
        </div>
      </section>

      <section className="blog-section blog-latest">
        <div className="blog-shell">
          <div className="blog-section-head left"><p className="blog-eyebrow muted">Lo último</p><h2>Lecturas para tener más claridad.</h2></div>
          {visibleArticles.length ? <div className="blog-card-grid">{visibleArticles.filter((article) => !article.featured).map((article) => <ArticleCard key={article.id} article={article} variant="latest" onRead={() => setLocation(`${blogPath}/article/${article.id}`)} />)}</div> : <div className="blog-empty"><p>No encontramos artículos con esa búsqueda.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); }}>Ver todos los artículos</button></div>}
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
            <ArticleCard article={articles[0]} variant="wide" onRead={() => setLocation(`${blogPath}/article/${articles[0].id}`)} />
            <div className="blog-global-list">
              {articles.slice(1).map((article) => <button className="blog-list-article" type="button" key={article.id} onClick={() => setLocation(`${blogPath}/article/${article.id}`)}><span>{article.category}</span><strong>{article.title}</strong><ArrowRight /></button>)}
              <button className="blog-list-article" type="button" onClick={() => setLocation(`${blogPath}/article/${articles[2].id}`)}><span>Global</span><strong>Operar en varias monedas sin perder el control de tu caja</strong><ArrowRight /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section blog-experience">
        <div className="blog-shell blog-experience-grid">
          <div><p className="blog-eyebrow">Desde la experiencia</p><h2>Muchos de estos temas empezaron antes de Bitaxus.</h2><p>Buena parte de lo que escribimos nace de situaciones reales que hemos visto acompañando empresas y emprendedores: negocios que crecían más rápido de lo que podían controlar, cobros que se enredaban y decisiones que se tomaban sin la información completa.</p><div className="blog-author"><span>AT</span><p><b>Alejandra Torres</b><small>Fundadora de Bitaxus</small></p></div></div>
          <div className="blog-experience-cards">{["Lo que aprendí acompañando negocios que crecían más rápido de lo que podían controlar", "El día que entendí por qué facturar no es lo mismo que recibir", "Cobrar bien no es incomodar: cómo lo aprendí como consultora"].map((title, index) => <button key={title} type="button" onClick={() => setLocation(`${blogPath}/article/${(articles[index + 1] || articles[0]).id}`)}><span>0{index + 1}</span><strong>{title}</strong><ArrowRight /></button>)}</div>
        </div>
      </section>

      <section className="blog-section blog-explains">
        <div className="blog-shell"><div className="blog-section-head"><p className="blog-eyebrow">Bitaxus explica</p><h2>Hay cosas que suenan complicadas hasta que alguien las explica bien.</h2></div><div className="blog-explains-grid">{["¿Qué es la tesorería de una empresa?", "¿Qué diferencia hay entre facturado y recibido?", "¿Qué es cartera?", "¿Qué significa trazabilidad de un pago?"].map((title, index) => <button key={title} type="button" onClick={() => setLocation(`${blogPath}/article/${articles[index % articles.length].id}`)}><span>0{index + 1}</span><strong>{title}</strong><ArrowRight /></button>)}</div></div>
      </section>

      <section className="blog-section blog-news-section"><div className="blog-shell"><div className="blog-news"><div><p className="blog-eyebrow">Ideas de Bitaxus</p><h2>Ideas para entender mejor el negocio que estás construyendo.</h2><p>Recibe nuevos artículos, aprendizajes y guías de Bitaxus.</p></div><form onSubmit={submitNewsletter}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@empresa.com" aria-label="Correo electrónico" /><button type="submit">Suscribirme <ArrowRight /></button><small role="status">{newsletterMessage || "Al suscribirte, aceptas nuestra política de privacidad."}</small></form></div></div></section>

      <section className="blog-product-cta"><div className="blog-shell"><h2>Leerlo ayuda. Tenerlo claro todos los días, más.</h2><p>Bitaxus está construyendo una experiencia para ayudarte a mantener más contexto sobre tus cobros, pagos y movimientos mientras tu negocio crece.</p><a href={asset("/")} className="blog-primary-cta">Conocer Bitaxus <ArrowRight /></a></div></section>

      <HomeFooter />


    </main>
  );
}

export function ArticleReader({ article, onClose }: { article: BlogArticle; onClose: () => void }) {
  const isCashflow = article.id === "plataformas" || article.id === "tasa";
  return <div className="blog-reader-page" role="presentation"><article className="blog-reader" role="article" aria-label={article.title}>
    <div className="blog-reader-bar"><button type="button" className="blog-reader-back" onClick={onClose}><span>←</span> Volver al blog</button><span className="blog-reader-mark">BITAXUS <i>LECTURA</i></span></div>
    <header className="blog-reader-header"><p className="blog-eyebrow">{article.category}</p><h1>{article.title}</h1><p className="blog-reader-dek">{article.summary}</p><div className="blog-reader-meta"><span>Por <b>Alejandra Torres</b></span><span>Fundadora de Bitaxus</span><span>{isCashflow ? "7 min de lectura" : "5 min de lectura"}</span></div></header>
    <figure className="blog-reader-hero"><img src={asset(article.image)} alt="" /><figcaption>Una mirada Bitaxus para entender mejor lo que ocurre detrás de cada operación.</figcaption></figure>
    <div className="blog-reader-layout"><aside className="blog-reader-toc"><span>En este artículo</span><a href="#contexto">La pregunta detrás del número</a><a href="#claridad">Lo que conviene separar</a><a href="#accion">Qué mirar desde hoy</a></aside><div className="blog-reader-prose">
      <p id="contexto">Hay momentos en los que un negocio parece estar creciendo, pero la operación empieza a pedir respuestas más claras. Las ventas suben, los clientes llegan y el equipo se mueve; aun así, cuando llega el momento de pagar o decidir, la sensación no siempre coincide con los números.</p>
      <p>Eso no significa que estés haciendo algo mal. Muchas veces significa que estás mirando una parte de la historia y dejando por fuera lo que pasa entre una venta, un cobro y el dinero que realmente queda disponible.</p>
      <h2>La pregunta detrás del número</h2><p>{isCashflow ? "Vender más no siempre significa que te esté quedando más. Las ventas miden lo que prometiste entregar, pero no necesariamente lo que ya entró ni lo que queda después de tus compromisos." : "Cada operación tiene un momento distinto: cuándo se acuerda, cuándo se factura, cuándo se cobra y cuándo ese dinero puede usarse para seguir operando."}</p>
      <blockquote>Entender mejor tu negocio también es parte de hacerlo crecer.</blockquote>
      <h2 id="claridad">Lo que conviene separar</h2><p>Cuando todo se mezcla en una sola cifra, las decisiones se vuelven intuitivas. Separar lo facturado, lo recibido y los compromisos próximos permite ver la película completa y conversar con el equipo desde la misma información.</p>
      <div className="blog-reader-insight"><p className="blog-eyebrow">Concepto Bitaxus</p><h3>{isCashflow ? "Facturado ≠ Recibido ≠ Lo que te quedó" : "El movimiento no siempre es claridad"}</h3><p>Lo importante no es tener un tablero complejo. Es saber qué pasó, qué está pendiente y qué puedes decidir hoy con tranquilidad.</p></div>
      <div className="blog-reader-compare"><div><p className="blog-eyebrow">Dos formas de leer el mismo crecimiento</p><h3>Más movimiento no siempre es más claridad.</h3></div><div className="blog-reader-compare-grid"><div><span>Negocio A</span><strong>Vende más</strong><p>Cobra tarde, acumula pendientes y decide con información incompleta.</p></div><div className="better"><span>Negocio B</span><strong>Controla mejor</strong><p>Cobra a tiempo, conoce sus compromisos y sabe qué puede mover.</p></div></div><b className="blog-reader-compare-note">La claridad suele ganarle al volumen.</b></div>
      <h2 id="accion">Qué mirar desde hoy</h2><p>Empieza por tres preguntas: cuánto de lo que registraste ya entró, qué está pendiente y qué compromisos vienen en las próximas semanas. Con esas respuestas a la mano, dejas de decidir por sensación y empiezas a decidir con contexto.</p>
      <p>La claridad no aparece cuando tienes más datos, sino cuando sabes cuáles necesitas mirar en el momento correcto.</p>
      <div className="blog-reader-cta"><p className="blog-eyebrow">Cómo lo estamos abordando en Bitaxus</p><h3>Una experiencia para mantener tus cobros, pagos y movimientos en contexto.</h3><a href={`${asset("/")}#contacto`} className="blog-primary-cta" onClick={onClose}>Conocer Bitaxus <ArrowRight /></a></div>
      <h2>Preguntas frecuentes</h2><div className="blog-reader-faq"><details open><summary>¿Facturar es lo mismo que recibir?<span>+</span></summary><p>No. Facturar registra una venta; recibir ocurre cuando el dinero entra efectivamente. Entre ambos momentos puede pasar bastante tiempo.</p></details><details><summary>¿Qué es la cartera de un negocio?<span>+</span></summary><p>Es el conjunto de ventas que ya hiciste pero todavía no te han pagado. Es dinero tuyo, pero aún no está disponible.</p></details><details><summary>¿Vender más siempre es bueno?<span>+</span></summary><p>Es bueno cuando viene acompañado de cobrar bien y tener claridad sobre lo que queda. Si crecen los pendientes sin control, la operación puede volverse más frágil.</p></details></div>
      <div className="blog-reader-author"><div className="blog-reader-avatar">AT</div><div><p className="blog-eyebrow">Sobre la autora</p><h3>Alejandra Torres</h3><span>Fundadora de Bitaxus</span><p>Alejandra acompaña negocios que están creciendo y necesitan entender mejor lo que ocurre con sus cobros, pagos y operación. Bitaxus nace de esas conversaciones.</p></div></div>
      <h2>Para cerrar</h2><p>Crecer no es el problema. El problema es crecer a ciegas, celebrando ventas mientras la operación cuenta otra historia. Mirar de cerca lo que pasa dentro del negocio te ayuda a tomar mejores decisiones y seguir avanzando.</p>
    </div></div>
  </article></div>;
}

function ArticleCard({ article, variant = "standard", onRead }: { article: (typeof articles)[number]; variant?: "standard" | "featured" | "wide" | "latest"; onRead: () => void }) {
  if (variant === "latest") {
    return <article className="blog-article-card latest"><div className="blog-card-media"><img src={asset(article.image)} width="1672" height="941" loading="lazy" decoding="async" alt="" /></div><div className="blog-card-body"><p className="blog-eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.summary}</p><button type="button" onClick={onRead}>Leer artículo <ArrowRight /></button></div></article>;
  }

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
