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
    <div className="blog-reader-layout"><aside className="blog-reader-toc"><span>En este artículo</span><a href="#ventas">La trampa de mirar solo las ventas</a><a href="#facturado">Facturado, recibido y lo que te queda</a><a href="#cartera">Cobrar tarde también tiene un costo</a><a href="#dos-negocios">Dos negocios que venden distinto</a><a href="#que-mirar">Qué mirar para saber cómo estás</a></aside><div className="blog-reader-prose">
      <p id="ventas">Cerraste un buen mes. Las ventas subieron, el equipo está ocupado y la sensación general es de que el negocio va bien. Y, sin embargo, cuando toca pagar a proveedores o cubrir la nómina, la cuenta no cuadra con esa sensación.</p>
      <p>No es raro. Es una de las situaciones más comunes en negocios que están creciendo: <strong>vender más y, aun así, sentir que no queda más</strong>. La respuesta casi nunca está en las ventas. Está en lo que pasa entre que vendes y que el ingreso realmente queda disponible.</p>
      <h2>La trampa de mirar solo las ventas</h2><p>Las ventas son la métrica más fácil de celebrar y la más incompleta para tomar decisiones. Miden lo que prometiste entregar, no lo que ya entró ni lo que te queda después de tus compromisos.</p><p>Cuando la única brújula es “cuánto vendimos”, es fácil crecer hacia un lugar incómodo: más operación, más obligaciones y menos claridad sobre el terreno que pisas.</p>
      <h2 id="facturado">Facturado, recibido y lo que realmente te queda</h2><p>Tres palabras que solemos usar como sinónimos y que significan cosas muy distintas. Separarlas es, muchas veces, el primer paso para entender el negocio de verdad.</p>
      <div className="reader-diagram"><p className="blog-eyebrow">Concepto Bitaxus</p><h3>Facturado <b>≠</b> Recibido <b>≠</b> Lo que te quedó</h3><div className="reader-funnel"><div className="reader-funnel-row"><div><strong>Facturado</strong><small>Lo que vendiste.</small></div><span className="reader-funnel-bar full">100%</span></div><div className="reader-funnel-row"><div><strong>Recibido</strong><small>Lo que efectivamente entró.</small></div><span className="reader-funnel-bar received">Menos lo que aún te deben</span></div><div className="reader-funnel-row"><div><strong>Lo que quedó</strong><small>Lo disponible después de compromisos y salidas.</small></div><span className="reader-funnel-bar real">Lo real</span></div></div></div>
      <p>Un negocio puede facturar mucho, recibir a destiempo y quedarse con muy poco disponible. En el día a día, lo único que puedes usar para pagar y decidir es esa última franja: <strong>lo que quedó</strong>.</p>
      <h2 id="cartera">Cobrar tarde también tiene un costo</h2><p>Cuando una venta se convierte en un pago que “ya llegará”, pasa a ser cartera: dinero que es tuyo pero que todavía no está disponible. Mientras tanto, tus obligaciones no esperan.</p><p>Esa diferencia de tiempos —cobras en 45 días pero pagas en 15— es la que aprieta la caja de muchos negocios sanos en el papel. No es un problema de rentabilidad; es un problema de <strong>cuándo</strong> entra cada cosa.</p>
      <blockquote>Vender más no significa automáticamente que tu negocio esté mejor.</blockquote>
      <h2 id="dos-negocios">Dos negocios que venden distinto</h2><p>Para verlo con claridad, vale la pena comparar dos negocios que, sobre el papel, podrían parecer buenos por igual:</p>
      <div className="reader-comparison"><div className="reader-comparison-grid"><div><span>Negocio A</span><strong>Vende más</strong><ul><li>Cobra tarde</li><li>Tiene cartera acumulada</li><li>No conoce claramente sus compromisos</li></ul></div><div className="better"><span>Negocio B</span><strong>Vende menos</strong><ul><li>Cobra mejor</li><li>Conoce qué está pendiente</li><li>Tiene mayor claridad sobre su operación</li></ul></div></div><p>Más ventas no siempre significan una operación más saludable.</p></div>
      <p>El Negocio A se ve mejor un lunes por la mañana. El Negocio B duerme mejor. Y a mediano plazo, la claridad suele ganarle al volumen.</p>
      <h2 id="que-mirar">Qué mirar para saber cómo está de verdad tu negocio</h2><p>No hace falta un tablero complejo. Con mirar de cerca unas pocas cosas ya cambia la conversación: cuánto de lo que facturaste ya entró, cuánto te deben y desde cuándo, qué compromisos tienes en las próximas semanas y qué te queda disponible después de todo eso.</p><p>Cuando esas respuestas están a la mano, dejas de decidir por sensación y empiezas a decidir por lo que realmente está pasando.</p>
      <div className="blog-reader-cta"><p className="blog-eyebrow">Cómo lo estamos abordando en Bitaxus</p><h3>Este es uno de los problemas que encontramos repetidamente acompañando negocios.</h3><p>Bitaxus está construyendo una experiencia para ayudarte a mantener a la mano lo que pasa con tus cobros, pagos y movimientos.</p><a href={`${asset("/")}#contacto`} className="blog-primary-cta" onClick={onClose}>Conocer Bitaxus <ArrowRight /></a></div>
      <h2>Preguntas frecuentes</h2><div className="blog-reader-faq"><details open><summary>¿Facturar es lo mismo que recibir?<span>+</span></summary><p>No. Facturar es registrar una venta y el compromiso de que te paguen; recibir es cuando ese pago efectivamente entra.</p></details><details><summary>¿Qué es la cartera de un negocio?<span>+</span></summary><p>Es el conjunto de ventas que ya hiciste pero todavía no te han pagado. Es dinero tuyo, pero no disponible.</p></details><details><summary>¿Cómo sé cuánto me queda realmente?<span>+</span></summary><p>Parte de lo que efectivamente recibiste y resta tus compromisos y salidas de las próximas semanas.</p></details><details><summary>¿Vender más siempre es bueno?<span>+</span></summary><p>Vender más es bueno cuando viene acompañado de cobrar bien y tener claridad sobre lo que queda.</p></details></div>
      <h2>Vender más está bien. Saber qué te queda, mejor.</h2><p>Crecer no es el problema. El problema es crecer a ciegas, celebrando ventas mientras la caja cuenta otra historia. Mirar de cerca lo que facturas, lo que recibes y lo que te queda te hace entender mejor el negocio que ya tienes entre manos.</p><div className="blog-reader-author"><div className="blog-reader-avatar">AT</div><div><p className="blog-eyebrow">Sobre la autora</p><h3>Alejandra Torres</h3><span>Fundadora de Bitaxus</span><p>Parte de Bitaxus nace de necesidades que Alejandra ha visto repetirse mientras las empresas crecen y necesitan entender mejor lo que ocurre dentro de su negocio.</p></div></div>
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
