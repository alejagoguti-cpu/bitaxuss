/**
 * Estilo de referencia: reproducción fiel del Figma Bitaxus.
 * Fondo negro editorial, rojo #ba0b0d como firma de acción y composición tecnológica asimétrica.
 */
import { ArrowRight, ChevronDown, Menu, Send, X } from "lucide-react";
import { useState } from "react";

const navLinks = ["Inicio", "Empresas", "Personas", "Blog", "Ayuda"];

const operations = [
  { title: "Recaudos", text: "Programa y registra los pagos que esperas recibir.", icon: "/2209-865.svg" },
  { title: "Pagos y dispersiones", text: "Organiza pagos individuales o múltiples de forma sencilla.", icon: "/2209-874.svg" },
  { title: "Decisiones más claras", text: "Ordena la información de tus movimientos y decide con mayor claridad.", icon: "/2209-883.svg" },
];

const steps = [
  ["1. Registras", "Valor, concepto y fecha.", "/2190-847.svg"],
  ["2. Lo ponemos en marcha", "Activamos el cobro y/o programamos el pago.", "/2190-857.svg"],
  ["La gestión avanza", "Tu cliente paga y/o el pago queda listo.", "/2190-867.svg"],
  ["Organizamos la información", "Cada movimiento queda en su lugar.", "/2190-877.svg"],
  ["Te mantenemos informado", "Confirmaciones por WhatsApp.", "/2190-887.svg"],
  ["Decides con claridad", "Movimientos y estadísticas para continuar.", "/2190-897.svg"],
];

const pioneerBenefits = [
  ["Acceso anticipado", "Conoce nuevas funciones antes de su lanzamiento general.", "/2180-29.svg"],
  ["Beneficios para Pioneros", "Accede a las condiciones definidas para este grupo.", "/2180-40.svg"],
  ["Cashback preferencial", "Recibe una condición especial dentro del futuro programa de cashback de Bitaxus.", "/2180-51.svg"],
  ["Red de aliados", "Accede a descuentos y beneficios con los comercios que se sumen al ecosistema Bitaxus.", "/2180-68.svg"],
];

function ScrollLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const modules: Array<[string, string, string[]]> = [
    ["Recaudos", "Canales habilitados para recibir y relacionar los pagos de tus clientes.", ["QR Dinámico", "Transferencias", "Tarjetas", "Conciliación"]],
    ["Pagos y dispersiones", "Organiza pagos individuales o múltiples desde una sola experiencia.", ["Pagos programados", "Dispersión masiva", "Beneficiarios", "Comprobantes"]],
    ["Integraciones", "Conecta las herramientas que ya usas a los flujos de Bitaxus.", ["API REST", "Webhooks", "Credenciales", "Documentación"]],
    ["Orquestación", "Combina canales y reglas para que cada movimiento llegue a su lugar.", ["Reglas", "Estados", "Alertas", "Trazabilidad"]],
  ];

  return (
    <main className="bitaxus-page" data-layer="Section 14" data-node-id="2166-4456">
      <section className="hero" aria-labelledby="hero-title" data-node-id="2166-3254">
        <img className="hero-render" src="/2166-3254.svg" alt="Bitaxus: vendiste como nunca, ¿y la plata?" />
        <div className="hero-hotspots" aria-label="Navegación principal del hero">
          <ScrollLink href="#inicio" className="hero-hotspot home">Inicio</ScrollLink>
          <ScrollLink href="#empresas" className="hero-hotspot empresas">Empresas</ScrollLink>
          <ScrollLink href="#personas" className="hero-hotspot personas">Personas</ScrollLink>
          <ScrollLink href="#tecnologia" className="hero-hotspot blog">Blog</ScrollLink>
          <ScrollLink href="#contacto" className="hero-hotspot ayuda">Ayuda</ScrollLink>
          <a className="hero-hotspot login" href="https://app.bitaxus.com/login">Iniciar sesión</a>
          <ScrollLink href="#contacto" className="hero-hotspot speak">Hablemos</ScrollLink>
          <ScrollLink href="#contacto" className="hero-hotspot speak-main">Hablemos</ScrollLink>
          <ScrollLink href="#agente" className="hero-hotspot how">Ver cómo funciona</ScrollLink>
        </div>

        <div className="mobile-hero" id="inicio">
          <header className="mobile-header">
            <img src="/2166-3795.webp" alt="Bitaxus" />
            <button type="button" className="menu-button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </header>
          {menuOpen && <nav className="mobile-nav">{navLinks.map((link) => <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{link}</a>)}</nav>}
          <div className="mobile-hero-content">
            <p>Cobrar debería ser tan fácil como enviar un mensaje.</p>
            <h1 id="hero-title">Vendiste<br />como nunca<br /><span>¿Y la plata?</span></h1>
            <p className="mobile-hero-copy">Bitaxus reúne tus cobros, pagos y movimientos para que sepas cuánto entra, cuánto sale y cuánto realmente te queda.</p>
            <div className="button-row"><ScrollLink href="#contacto" className="button primary">Hablemos <ArrowRight /></ScrollLink><ScrollLink href="#agente" className="button ghost">Ver cómo funciona</ScrollLink></div>
          </div>
        </div>
      </section>

      <section className="agent-section" id="agente" data-node-id="2209-890">
        <div className="content-frame agent-layout">
          <div className="agent-intro">
            <p className="eyebrow">ASÍ FUNCIONA TU AGENTE</p>
            <h2>No necesitas otra aplicación para tener el control.</h2>
            <p>Usa WhatsApp y deja que nuestro Agente te guíe paso a paso para programar recaudos, organizar pagos y consultar tus operaciones.</p>
          </div>
          <article className="chat-demo" aria-label="Demostración de conversación con el agente Bitaxus">
            <div className="chat-head"><img src="/2209-966.webp" alt="" /><div><strong>Bitaxus</strong><small>en línea</small></div></div>
            <div className="chat-body">
              <p className="bubble outgoing">Quiero programar un recaudo.<small>10:44 AM</small></p>
              <p className="bubble incoming"><b>Bitaxus</b>¡Claro! Vamos paso a paso. ¿Cuánto vas a cobrar y cuál es el concepto?<small>10:45 AM</small></p>
              <p className="bubble outgoing">$1.250.000 por servicios de publicidad.<small>10:46 AM</small></p>
              <button type="button" className="chat-action">Programar un pago</button>
              <button type="button" className="chat-action secondary">Ver movimientos</button>
            </div>
            <div className="chat-input"><span>Escribe un mensaje</span><button type="button" aria-label="Enviar mensaje"><Send size={15} /></button></div>
          </article>
        </div>
        <div className="clarity-wrap content-frame">
          <p className="eyebrow center">COBRAR NO DEBERÍA SER INCÓMODO.</p>
          <h2 className="section-title">Recibe, paga y decide con más claridad.</h2>
          <div className="operation-grid">{operations.map((operation) => <article className="operation-card" key={operation.title}><div className="icon-slab"><img src={operation.icon} alt="" /></div><h3>{operation.title}</h3><p>{operation.text}</p></article>)}</div>
        </div>
      </section>

      <section className="steps-section" data-node-id="2189-704">
        <div className="content-frame">
          <h2 className="section-title dark-title">Registras lo que necesitas.<br />Nuestro agente te ayuda con lo demás.</h2>
          <div className="step-grid">{steps.map(([title, text, icon]) => <article className="step" key={title}><div className="step-icon"><img src={icon} alt="" /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="global-section" id="empresas" data-node-id="2189-704">
        <div className="content-frame global-layout">
          <div>
            <p className="eyebrow">BITAXUS GLOBAL</p>
            <h2>Más alcance.<br /><span>Mejores oportunidades.</span></h2>
            <p>Conecta tu operación con nuevos corredores y canales habilitados para mover tu negocio con más libertad.</p>
            <a className="inline-link" href="#contacto">Conoce Bitaxus Global <ArrowRight /></a>
          </div>
          <form className="exchange-card" onSubmit={(event) => event.preventDefault()} aria-label="Calculadora de ejemplo de Bitaxus Global">
            <div className="exchange-row"><label htmlFor="send-amount">TÚ ENVÍAS USD</label><input id="send-amount" defaultValue="1.000" /></div>
            <div className="exchange-stats"><span>Tipo de cambio <b>3.860</b></span><span>RECIBES COP <b>3.860.000</b></span></div>
            <button type="submit">Consultar operación</button>
          </form>
        </div>
      </section>

      <section className="audience-section">
        <div className="content-frame"><p className="eyebrow center">UNA HERRAMIENTA PARA PERSONAS Y EMPRESAS QUE NO PARAN DE CRECER.</p>
          <div className="audience-grid">
            <article className="audience-card company" id="empresas"><div><p>BITAXUS PARA EMPRESAS</p><h3>Coordina cobros, pagos y equipos desde una operación conectada.</h3><a href="#contacto">Bitaxus para empresas <ArrowRight /></a></div></article>
            <article className="audience-card people" id="personas"><div><p>BITAXUS PARA PERSONAS</p><h3>Ten a la mano una forma más clara de organizar tu dinero.</h3><a href="#contacto">Bitaxus para personas <ArrowRight /></a></div></article>
          </div>
        </div>
      </section>

      <section className="pioneer-section" id="pioneros" data-node-id="2175-358">
        <div className="content-frame"><p className="eyebrow center red">SER PIONERO TIENE SUS BENEFICIOS.</p><p className="pioneer-intro">Accede a condiciones especiales pensadas para quienes forman parte de esta etapa de Bitaxus.</p>
          <div className="pioneer-grid">{pioneerBenefits.map(([title, text, icon], index) => <article className={`pioneer-card ${index === 1 ? "featured" : ""}`} key={title}><div className="pioneer-icon"><img src={icon} alt="" /></div>{index > 1 && <span className="coming">PRÓXIMAMENTE</span>}<h3>{title}</h3><p>{text}</p></article>)}</div>
          <a href="#contacto" className="button primary pioneer-button">Quiero ser Pionero</a><p className="limited"><i /> Cupos limitados para esta etapa.</p>
        </div>
      </section>

      <section className="technology-section" id="tecnologia" data-node-id="2190-825">
        <div className="content-frame"><p className="eyebrow">LA TECNOLOGÍA QUE <span>HACE POSIBLE</span> CADA PASO.</p><p className="tech-copy">Bitaxus conecta herramientas, integraciones y canales habilitados para facilitar tus recaudos y pagos desde una sola experiencia.</p>
          <div className="tech-shell"><div className="module-tabs" role="tablist" aria-label="Módulos de Bitaxus">{modules.map(([name], index) => <button type="button" role="tab" aria-selected={activeModule === index} className={activeModule === index ? "active" : ""} key={name} onClick={() => setActiveModule(index)}>{name}</button>)}</div>
            <div className="module-stage"><p>Módulo activo</p><h2>{modules[activeModule][0]}</h2><p>{modules[activeModule][1]}</p><ul>{modules[activeModule][2].map((item) => <li key={item}>{item}</li>)}</ul><div className="tech-visual"><span /><span /><span /><span /></div></div>
          </div>
        </div>
      </section>

      <section className="trust-section" data-node-id="2166-4601"><div className="content-frame"><h2 className="section-title dark-title">Seguridad, trazabilidad y acompañamiento.</h2><p className="trust-intro">Bitaxus aplica procesos de validación y seguimiento para proteger la información y mantener claridad sobre cada operación.</p><div className="trust-grid"><article><img src="/2167-4623.svg" alt="" /><h3>Tus datos protegidos</h3><p>Aplicamos medidas de seguridad para proteger la información asociada a tu cuenta y tus movimientos.</p></article><article><img src="/2167-4633.svg" alt="" /><h3>Operaciones verificadas</h3><p>Cada operación pasa por procesos de validación y seguimiento de acuerdo con su naturaleza.</p></article><article><img src="/2167-4643.svg" alt="" /><h3>Acompañamiento humano</h3><p>Nuestro equipo está disponible cuando una operación requiere orientación o revisión.</p></article></div></div></section>

      <section className="contact-section" id="contacto" data-node-id="2166-4424"><div className="contact-panel"><h2>Deja de organizar tus cobros y pagos a mano.</h2><p>Programa tus cobros y pagos, recibe actualizaciones de nuestro Agente y consulta todo desde WhatsApp.</p><div className="button-row"><a href="https://wa.me/573000000000" className="button primary">Hablemos</a><a href="https://wa.me/573000000000" className="button whatsapp">Escríbenos por WhatsApp <ArrowRight /></a></div></div></section>

      <footer className="footer" data-node-id="2166-3789"><div className="content-frame footer-top"><div className="footer-brand"><img src="/2166-3795.webp" alt="Bitaxus" /><h3>Tu operación,<br />conectada.</h3><p>Bitaxus facilita y coordina servicios de recaudo, pagos y dispersión mediante aliados, proveedores y canales habilitados.</p><div className="social-row"><a href="#contacto" aria-label="Red social Bitaxus"><img src="/2166-3804.svg" alt="" /></a><a href="#contacto" aria-label="Red social Bitaxus"><img src="/2166-3807.svg" alt="" /></a><a href="#contacto" aria-label="Red social Bitaxus"><img src="/2166-3810.svg" alt="" /></a></div></div>
        <FooterColumn title="Explora" links={["Inicio", "Empresas", "Personas", "Bitaxus Global", "Pioneros", "Blog", "Ayuda"]} />
        <FooterColumn title="Producto" links={["Recaudos", "Pagos y dispersiones", "Integraciones API", "Orquestación", "Agente Bitaxus", "Iniciar sesión"]} />
        <FooterColumn title="Legal" links={["Términos y condiciones de uso", "Tratamiento y protección de datos", "Privacidad y uso de cookies", "Términos del programa Pioneros", "Peticiones, consultas y reclamos"]} />
        <FooterColumn title="Confianza" links={["Seguridad en Bitaxus", "Cumplimiento y controles", "Línea ética", "Reportar una vulnerabilidad"]} />
        <div className="footer-column contact"><h4>Contacto</h4><b>Bitaxus S.A.S.</b><a href="mailto:support@bitaxus.com">support@bitaxus.com</a><a href="tel:+573000000000">+57 300 000 0000</a><span>Lun - Vie: 8am - 6pm</span><span>Medellín, Colombia</span></div>
      </div><div className="content-frame footer-bottom"><p>Bitaxus es una compañía de tecnología, no una entidad financiera. Los servicios de billetera, tarjetas y transferencias son operados por entidades financieras autorizadas y vigiladas por la Superintendencia Financiera de Colombia o sus equivalentes en otras jurisdicciones. Bitaxus actúa como un orquestador tecnológico para facilitar la gestión financiera de sus usuarios.</p><div><span>© 2026 Bitaxus S.A.S. Todos los derechos reservados.</span><a href="https://app.bitaxus.com/login">Iniciar sesión</a></div></div></footer>
    </main>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div className="footer-column"><h4>{title}</h4>{links.map((link) => <a href="#inicio" key={link}>{link}</a>)}</div>;
}
