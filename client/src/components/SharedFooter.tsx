import { ArrowRight } from "lucide-react";

const asset = (source: string) => `${import.meta.env.BASE_URL}${source.replace(/^\//, "")}`;
const loginUrl = "https://app.bitaxus.com/login";

const destinations: Record<string, string> = {
  "Inicio": asset("/"), "Empresas": `${asset("/")}#empresas`, "Personas": `${asset("/")}#personas`, "Bitaxus Global": `${asset("/")}#global`, "Pioneros": `${asset("/")}#pioneros`, "Blog": `${asset("/blog")}`, "Ayuda": `${asset("/")}#contacto`, "Recaudos": `${asset("/")}#tecnologia`, "Pagos y dispersiones": `${asset("/")}#tecnologia`, "Integraciones API": `${asset("/")}#tecnologia`, "Orquestación": `${asset("/")}#tecnologia`, "Agente Bitaxus": `${asset("/")}#agente`, "Iniciar sesión": loginUrl,
};

const footerColumns = [
  { title: "Explora", links: ["Inicio", "Empresas", "Personas", "Bitaxus Global", "Pioneros", "Blog", "Ayuda"] },
  { title: "Producto", links: ["Recaudos", "Pagos y dispersiones", "Integraciones API", "Orquestación", "Agente Bitaxus", "Iniciar sesión"] },
  { title: "Legal", links: ["Términos y condiciones de uso", "Tratamiento y protección de datos", "Privacidad y uso de cookies", "Términos del programa Pioneros", "Peticiones, consultas y reclamos"] },
  { title: "Confianza", links: ["Seguridad en Bitaxus", "Cumplimiento y controles", "Línea ética", "Reportar una vulnerabilidad"] },
];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div className="footer-column"><h4>{title}</h4>{links.map((link) => <a href={destinations[link] || `${asset("/")}#contacto`} key={link}>{link}</a>)}</div>;
}

export function SharedFooter() {
  return <footer className="footer" data-node-id="2166-3789">
    <div className="content-frame footer-top">
      <div className="footer-brand">
        <img src={asset("/2166-3795.webp")} width="105" height="30" loading="lazy" decoding="async" alt="Bitaxus" />
        <p className="footer-brand-kicker">BITAXUS / SISTEMA OPERATIVO</p>
        <h3>Tu operación,<br />conectada.</h3>
        <p>Una infraestructura para darle contexto a tus cobros, pagos y decisiones.</p>
        <a className="footer-brand-cta" href={`${asset("/")}#contacto`}>Conocer Bitaxus <ArrowRight /></a>
        <div className="social-row"><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3804.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3807.svg")} loading="lazy" decoding="async" alt="" /></a><a href={`${asset("/")}#contacto`} aria-label="Red social Bitaxus"><img src={asset("/2166-3810.svg")} loading="lazy" decoding="async" alt="" /></a></div>
      </div>
      {footerColumns.map((column) => <FooterColumn key={column.title} {...column} />)}
      <div className="footer-column contact"><h4>Contacto</h4><b>Bitaxus S.A.S.</b><a href="mailto:support@bitaxus.com">support@bitaxus.com</a><a href="tel:+573213816103">+57 321 381 6103</a><span>Lun - Vie: 8am - 6pm</span><span>Medellín, Colombia</span></div>
    </div>
    <div className="content-frame footer-bottom"><p>Bitaxus es una compañía de tecnología, no una entidad financiera. Los servicios de billetera, tarjetas y transferencias son operados por entidades financieras autorizadas y vigiladas por la Superintendencia Financiera de Colombia o sus equivalentes en otras jurisdicciones. Bitaxus actúa como un orquestador tecnológico para facilitar la gestión financiera de sus usuarios.</p><div><span>© 2026 Bitaxus S.A.S. Todos los derechos reservados.</span><a href={loginUrl}>Iniciar sesión</a></div></div>
  </footer>;
}
