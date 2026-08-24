/**
 * Estilo de referencia: editorial Bitaxus.
 * Alternancia de fondos oscuros y claros como la landing Bitaxus, con acento rojo y titulares BELAMOR.
 */
import { ArrowLeft, ArrowRight, ChevronDown, Search } from "lucide-react";
import { Fragment, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import "./Blog.css";
import "./BlogOverrides.css";

import { articles, asset, BlogArticle, blogPath, loginUrl } from "./blogData";
import { ArticleVisuals } from "./articleVisuals";

const categories = ["Todos", ...Array.from(new Set(articles.map((article) => article.category)))];

const globalCategoryCopy: Record<string, string> = {
  "Control de negocio": "Mira qué está pasando dentro de tu operación.",
  "Emprendimiento": "Acompaña el crecimiento sin perder claridad.",
  "Clientes y ventas": "Convierte tus acuerdos y cobros en relaciones más sanas.",
  "Global": "Entiende lo que cambia cuando tu negocio cruza fronteras.",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const latestCarouselRef = useRef<HTMLDivElement>(null);
  const [latestPage, setLatestPage] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    document.title = "Blog Bitaxus | Ideas para entender mejor tu negocio";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", "Historias, aprendizajes y herramientas de Bitaxus para entender mejor los cobros, pagos y el crecimiento de tu negocio.");
  }, []);

  const visibleArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryMatches = activeCategory === "Todos" || article.category === activeCategory;
      const searchMatches = !normalizedQuery || `${article.title} ${article.summary} ${article.category}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && searchMatches;
    });
  }, [activeCategory, query]);

  const latestPageSize = 3;
  const latestPageCount = Math.max(1, Math.ceil(visibleArticles.length / latestPageSize));

  const goToLatestPage = (page: number) => {
    const container = latestCarouselRef.current;
    const firstSlide = container?.querySelector<HTMLElement>(".blog-card-slide");
    if (!container || !firstSlide) return;
    const gap = Number.parseFloat(getComputedStyle(container).columnGap || getComputedStyle(container).gap || "24") || 24;
    const nextPage = Math.max(0, Math.min(page, latestPageCount - 1));
    setLatestPage(nextPage);
    container.scrollTo({ left: nextPage * latestPageSize * (firstSlide.offsetWidth + gap), behavior: "smooth" });
  };

  const scrollLatest = (direction: number) => goToLatestPage(latestPage + direction);

  const selectGlobalCategory = (category: string) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    setLatestPage(0);
    latestCarouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [activeCategory, query]);

  useEffect(() => {
    if (isCarouselPaused || latestPageCount <= 1) return;
    const timer = window.setInterval(() => {
      goToLatestPage((latestPage + 1) % latestPageCount);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isCarouselPaused, latestPage, latestPageCount]);

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
          </div>
          <ArticleCard article={articles[0]} variant="featured" href={`${blogPath}/article/${articles[0].id}`} />
        </div>
      </section>

      <section className="blog-section blog-latest">
        <div className="blog-shell">
          <div className="blog-category-toolbar"><label htmlFor="blog-category-select">Categoría</label><select id="blog-category-select" value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filtrar artículos por categoría">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
          <div className="blog-latest-heading"><div className="blog-section-head left"><p className="blog-eyebrow muted">Lo último</p><h2>Lecturas para tener más claridad.</h2></div><div className="blog-carousel-controls" aria-label="Navegar por artículos"><button type="button" onClick={() => scrollLatest(-1)} aria-label="Artículos anteriores"><ArrowLeft /></button><button type="button" onClick={() => scrollLatest(1)} aria-label="Siguientes artículos"><ArrowRight /></button></div></div>
          {visibleArticles.length ? <><div className="blog-card-carousel" ref={latestCarouselRef} role="list" onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)} onFocusCapture={() => setIsCarouselPaused(true)} onBlurCapture={() => setIsCarouselPaused(false)}>{visibleArticles.map((article) => <div className="blog-card-slide" role="listitem" key={article.id}><ArticleCard article={article} variant="latest" href={`${blogPath}/article/${article.id}`} /></div>)}</div><div className="blog-carousel-dots" role="tablist" aria-label="Páginas del carrusel">{Array.from({ length: latestPageCount }, (_, index) => <button key={index} type="button" role="tab" aria-selected={latestPage === index} aria-label={`Ir a la página ${index + 1}`} className={latestPage === index ? "active" : ""} onClick={() => goToLatestPage(index)} />)}</div></> : <div className="blog-empty"><p>No encontramos artículos con esa búsqueda.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); }}>Ver todos los artículos</button></div>}
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
            <ArticleCard article={articles[0]} variant="wide" href={`${blogPath}/article/${articles[0].id}`} />
            <div className="blog-global-categories" aria-label="Explorar artículos por categoría">
              {categories.filter((category) => category !== "Todos").map((category) => {
                const count = articles.filter((article) => article.category === category).length;
                return <button className={`blog-global-category-card ${activeCategory === category ? "active" : ""}`} type="button" key={category} onClick={() => selectGlobalCategory(category)} aria-pressed={activeCategory === category}><span className="blog-global-category-index">{String(count).padStart(2, "0")}</span><div><span className="blog-global-category-label">{category}</span><strong>{globalCategoryCopy[category] || "Ideas para entender mejor tu negocio."}</strong><small>{count} {count === 1 ? "artículo" : "artículos"}</small></div><ArrowRight /></button>;
              })}
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

const renderEmphasizedAnswer = (text: string): ReactNode => {
  const pattern = /(facturaci[oó]n|caja|cobro|cobrar|costos?|gastos?|tesorer[ií]a|plazo|cliente|compromisos?|informaci[oó]n|trazabilidad|decisiones?|Bitaxus)/gi;
  let emphasized = 0;
  return text.split(pattern).map((part, index) => {
    const isTerm = pattern.test(part);
    pattern.lastIndex = 0;
    if (isTerm && emphasized < 3) { emphasized += 1; return <strong key={`emphasis-${index}`}>{part}</strong>; }
    return <span key={`answer-${index}`}>{part}</span>;
  });
};

const isArticleHeading = (line: string, index: number, lines: string[]) => {
  if (line.length < 18 || line.length > 105) return false;
  if (/^[¿?]/.test(line) || /[.!,:;]$/.test(line)) return false;
  if (/^(Por |Durante |Cuando |Y |Pero |No |Es |La |Una |Un |A |En |Para |Si |También |Porque |Eso |Ahí |Al |Con |Lo |Los |Las |Hay |Puede |Muchas |Parte |Desde |Cada |Mientras |Por eso|De hecho)/i.test(line)) return false;
  return index > 0 && lines[index - 1].length > 80;
};

function renderArticleBlocks(article: BlogArticle) {
  const lines = article.content.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const faqIndex = lines.findIndex((line) => line.toLowerCase() === "preguntas frecuentes");
  const faqQuestionIndexes = new Set<number>();
  const faqAnswerIndexes = new Set<number>();
  if (faqIndex >= 0) {
    for (let index = faqIndex + 1; index < lines.length; index += 1) {
      if (lines[index].endsWith("?") && lines[index].length < 180) {
        faqQuestionIndexes.add(index);
        if (lines[index + 1] && !lines[index + 1].endsWith("?")) faqAnswerIndexes.add(index + 1);
      }
    }
  }
  const visualIndexes = [Math.floor(lines.length * .18), Math.floor(lines.length * .4), Math.floor(lines.length * .63), Math.floor(lines.length * .84)];
  return lines.map((line, index) => {
    const visualPart = visualIndexes.indexOf(index);
    const visual = visualPart >= 0 ? <ArticleVisuals article={article} part={(visualPart + 1) as 1 | 2 | 3 | 4} /> : null;
    let block: ReactNode;
    if (faqAnswerIndexes.has(index)) block = null;
    else if (line.toLowerCase() === "preguntas frecuentes") block = <h2>Preguntas frecuentes</h2>;
    else if (line.startsWith("Bitaxus ·")) block = <div className="blog-reader-cta"><p className="blog-eyebrow">{line}</p><h3>Cobras. Pagas. Sabes.</h3><p>Una experiencia Bitaxus para conservar el contexto de tus cobros, pagos y movimientos.</p><a href={`${asset("/")}#contacto`} className="blog-primary-cta">Conocer Bitaxus <ArrowRight /></a></div>;
    else if (line.startsWith("👉")) block = <p className="blog-reader-link">{line.replace("👉 ", "")}</p>;
    else if (faqQuestionIndexes.has(index)) block = <details className="blog-reader-faq-card" open={index === faqIndex + 1}><summary><span>{String(index - faqIndex).padStart(2, "0")}</span><strong>{line}</strong><i>+</i></summary><div className="blog-reader-faq-answer"><p>{renderEmphasizedAnswer(lines[index + 1] || "")}</p></div></details>;
    else if (isArticleHeading(line, index, lines)) block = <h2>{line}</h2>;
    else block = <p>{line}</p>;
    return <Fragment key={`article-block-${index}`}>{visual}{block}</Fragment>;
  });
}

export function ArticleReader({ article, onClose }: { article: BlogArticle; onClose: () => void }) {
  return <div className="blog-reader-page" role="presentation"><article className="blog-reader" role="article" aria-label={article.title}>
    <div className="blog-reader-bar"><button type="button" className="blog-reader-back" onClick={onClose}><span>←</span> Volver al blog</button><span className="blog-reader-mark">BITAXUS <i>LECTURA</i></span></div>
    <header className="blog-reader-header"><p className="blog-eyebrow">{article.category}</p><h1>{article.title}</h1><p className="blog-reader-dek">{article.summary}</p><div className="blog-reader-meta"><span>Por <b>Alejandra Torres</b></span><span>Fundadora de Bitaxus</span><span>7 min de lectura</span></div></header>
    <figure className="blog-reader-hero"><img src={asset(article.image)} alt="" /><figcaption>Una mirada Bitaxus para entender mejor lo que ocurre detrás de cada operación.</figcaption></figure>
    <div className="blog-reader-layout"><aside className="blog-reader-toc"><span>En este artículo</span><a href="#inicio">Introducción</a><a href="#contenido">La idea central</a><a href="#faq">Preguntas frecuentes</a><a href="#cierre">Cierre</a></aside><div className="blog-reader-prose" id="contenido">
      <p id="inicio">{article.summary}</p>
      {renderArticleBlocks(article)}
      <div id="faq" />
      <div id="cierre" />
    </div></div>
  </article></div>;
}
function ArticleCard({ article, variant = "standard", href }: { article: (typeof articles)[number]; variant?: "standard" | "featured" | "wide" | "latest"; href: string }) {
  if (variant === "latest") {
    return <article className="blog-article-card latest"><div className="blog-card-media"><img src={asset(article.image)} width="1672" height="941" loading="lazy" decoding="async" alt="" /></div><div className="blog-card-body"><p className="blog-eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.summary}</p><a className="blog-article-read" href={href}>Leer artículo <ArrowRight /></a></div></article>;
  }

  return <article className={`blog-article-card ${variant}`}><img src={asset(article.image)} width="1672" height="941" loading={variant === "featured" ? "eager" : "lazy"} fetchPriority={variant === "featured" ? "high" : "auto"} decoding="async" alt="" /><div className="blog-card-shade" /><div className="blog-article-copy"><h3 className="sr-only">{article.title}</h3><p className="blog-eyebrow">{article.category}</p><a className="blog-article-read" href={href}>Leer artículo <ArrowRight /></a></div></article>;
}

function Capsule({ number, title, copy, active = false, onClick }: { number: string; title: string; copy: string; active?: boolean; onClick: () => void }) {
  return <button type="button" className={`blog-capsule ${active ? "active" : ""}`} onClick={onClick}><span>{number}</span><strong>{title}</strong><p>{copy}</p><i>Explorar <ArrowRight /></i></button>;
}

function HomeFooter() {
  const destinations: Record<string, string> = { "Inicio": asset("/"), "Empresas": `${asset("/")}#empresas`, "Personas": `${asset("/")}#personas`, "Bitaxus Global": `${asset("/")}#global`, "Pioneros": `${asset("/")}#pioneros`, "Blog": blogPath, "Ayuda": `${asset("/")}#contacto`, "Recaudos": `${asset("/")}#tecnologia`, "Pagos y dispersiones": `${asset("/")}#tecnologia`, "Integraciones API": `${asset("/")}#tecnologia`, "Orquestación": `${asset("/")}#tecnologia`, "Agente Bitaxus": `${asset("/")}#agente`, "Iniciar sesión": loginUrl };
  const FooterColumn = ({ title, links }: { title: string; links: string[] }) => <div className="footer-column"><h4>{title}</h4>{links.map((link) => <a href={destinations[link] || `${asset("/")}#contacto`} key={link}>{link}</a>)}</div>;
  return <footer className="footer" data-node-id="2166-3789"><div className="content-frame footer-top"><div className="footer-brand"><img src={asset("/2166-3795.webp")} width="105" height="30" loading="lazy" decoding="async" alt="Bitaxus" /><h3>Tu operación,<br />conectada.</h3><p>Bitaxus facilita y coordina servicios de recaudo, pagos y dispersión mediante aliados, proveedores y canales habilitados.</p><div className="social-row"><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3804.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3807.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3810.svg")} loading="lazy" decoding="async" alt="" /></a></div></div><FooterColumn title="Explora" links={["Inicio", "Empresas", "Personas", "Bitaxus Global", "Pioneros", "Blog", "Ayuda"]} /><FooterColumn title="Producto" links={["Recaudos", "Pagos y dispersiones", "Integraciones API", "Orquestación", "Agente Bitaxus", "Iniciar sesión"]} /><FooterColumn title="Legal" links={["Términos y condiciones de uso", "Tratamiento y protección de datos", "Privacidad y uso de cookies", "Términos del programa Pioneros", "Peticiones, consultas y reclamos"]} /><FooterColumn title="Confianza" links={["Seguridad en Bitaxus", "Cumplimiento y controles", "Línea ética", "Reportar una vulnerabilidad"]} /><div className="footer-column contact"><h4>Contacto</h4><b>Bitaxus S.A.S.</b><a href="mailto:support@bitaxus.com">support@bitaxus.com</a><a href="tel:+573213816103">+57 321 381 6103</a><span>Lun - Vie: 8am - 6pm</span><span>Medellín, Colombia</span></div></div><div className="content-frame footer-bottom"><p>Bitaxus es una compañía de tecnología, no una entidad financiera. Los servicios de billetera, tarjetas y transferencias son operados por entidades financieras autorizadas y vigiladas por la Superintendencia Financiera de Colombia o sus equivalentes en otras jurisdicciones. Bitaxus actúa como un orquestador tecnológico para facilitar la gestión financiera de sus usuarios.</p><div><span>© 2026 Bitaxus S.A.S. Todos los derechos reservados.</span><a href={loginUrl}>Iniciar sesión</a></div></div></footer>;
}
