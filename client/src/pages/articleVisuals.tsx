import { ArrowUpRight, BadgeCheck, ChartNoAxesCombined, CircleDollarSign, Clock3, FileCheck2, Gauge, ListChecks, Search, ShieldCheck, UsersRound, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { BlogArticle } from "./blogData";

const comparisonIcons: [LucideIcon, LucideIcon] = [CircleDollarSign, Gauge];
const flowIcons: LucideIcon[] = [Search, ListChecks, ChartNoAxesCombined];
const timelineIcons: LucideIcon[] = [Clock3, FileCheck2, BadgeCheck];
const checklistIcons: LucideIcon[] = [WalletCards, ShieldCheck, UsersRound];
const articleThemes: Record<string, string> = {
  "control-ventas": "orbit",
  "gastos-operacion": "ledger",
  "cierre-mes": "closeout",
  "empresa-crecio": "network",
  "contratar-mas": "capacity",
  "delegar-control": "delegation",
  "cobrar-parte-vender": "agreement",
  "condiciones-pago": "terms",
  "plazo-cliente": "waiting",
};

function sourceLines(article: BlogArticle) {
  return article.content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 22)
    .filter((line) => !line.startsWith("👉"))
    .filter((line) => !line.startsWith("Ver perfil"))
    .filter((line) => !line.includes("Cobras. Pagas. Sabes."))
    .filter((line) => !line.startsWith("Sobre la autora"));
}

function sourcePick(lines: string[], ratio: number, fallback: string) {
  return lines[Math.min(lines.length - 1, Math.max(0, Math.floor(lines.length * ratio)))] || fallback;
}

function firstSentence(line: string, fallback: string) {
  const clean = line.replace(/\s+/g, " ").trim();
  const sentence = clean.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return sentence || clean || fallback;
}

function sourceTitle(line: string, fallback: string) {
  return firstSentence(line, fallback).replace(/[.!?]+$/, "");
}

function sourceCopy(line: string, fallback: string) {
  return firstSentence(line, fallback);
}

function sourceCardTitle(line: string, fallback: string) {
  return firstSentence(line, fallback).replace(/[.!?]+$/, "");
}

type ConciseVisual = {
  title: string;
  conclusion?: string;
  cards?: string[];
  cardCopies?: string[];
  copies?: string[];
};

type VisualKind = "intro" | "flow" | "timeline" | "checklist";

const conciseVisuals: Record<string, Partial<Record<VisualKind, ConciseVisual>>> = {
  "control-ventas": {
    intro: { title: "VENDER MÁS NO BASTA", conclusion: "ENTENDER LO QUE QUEDA TAMBIÉN ES PARTE DE CRECER", cards: ["VENDER NO ES COBRAR", "CRECER REQUIERE TRAZABILIDAD"], cardCopies: ["Las ventas pueden subir y la caja seguir apretada.", "Relaciona ingresos, compromisos y pagos."] },
    flow: { title: "ENTIENDE QUÉ QUEDA", cards: ["FACTURAR NO ES COBRAR", "LA CAJA TAMBIÉN CUENTA", "CRECER SIN CONTROL AMPLIFICA LOS PROBLEMAS"] },
    timeline: { title: "MIRA MÁS QUE LAS VENTAS", copies: ["SEPARA LO FACTURADO DE LO RECIBIDO", "IDENTIFICA LO QUE YA TIENE DESTINO", "TOMA DECISIONES CON CONTEXTO"] },
    checklist: { title: "SOSTENER EL CRECIMIENTO ES EL RETO", cards: ["CONOCE LO QUE COBRAS", "ANTICIPA TUS COMPROMISOS", "NO PIERDAS EL CONTROL"] },
  },
  "gastos-operacion": {
    intro: { title: "AHORRAR NO ES REDUCIR EL TOTAL", conclusion: "MIRA LA ESTRUCTURA COMPLETA DE TU OPERACIÓN", cards: ["LOS GASTOS SE ACUMULAN", "REVISA EL COSTO REAL"], cardCopies: ["Cada herramienta, licencia y comisión cambia el total.", "Comparar periodos revela lo que la memoria no ve."] },
    flow: { title: "GASTAR MENOS NO SIEMPRE ALCANZA", cards: ["RECUERDA TODOS TUS GASTOS", "NO TODO GASTO PEQUEÑO ES INNECESARIO", "BUSCAS CLARIDAD, NO SOLO AHORRO"] },
    timeline: { title: "ENTIENDE TU ESTRUCTURA", copies: ["UN AHORRO PUEDE OCULTAR NUEVOS COSTOS", "CADA HERRAMIENTA CAMBIA TU OPERACIÓN", "MIRA EL TOTAL, NO SOLO CADA SALIDA"] },
    checklist: { title: "CADA SALIDA TIENE CONTEXTO", cards: ["SABES DÓNDE GASTAS", "ENTIENDES POR QUÉ GASTAS", "NO MIRES MOVIMIENTOS AISLADOS"] },
  },
  "cierre-mes": {
    intro: { title: "CIERRA Y ENTIENDE", conclusion: "EL SALDO FINAL ES SOLO EL PUNTO DE PARTIDA", cards: ["CONCILIA TUS MOVIMIENTOS", "ENTIENDE QUÉ QUEDÓ"], cardCopies: ["Relaciona ingresos, pagos y compromisos.", "Distingue saldo disponible de dinero comprometido."] },
    flow: { title: "EL SALDO NO LO EXPLICA TODO", cards: ["QUÉ ENTRÓ", "QUÉ SALIÓ", "QUÉ SIGUE PENDIENTE"] },
    timeline: { title: "CIERRA CON INFORMACIÓN", copies: ["ORDENA LOS MOVIMIENTOS", "EXPLICA LAS DIFERENCIAS", "PREPARA EL SIGUIENTE MES"] },
    checklist: { title: "CERRAR BIEN TE PERMITE DECIDIR MEJOR", cards: ["CONCILIA", "EXPLICA", "PLANEA"] },
  },
  "empresa-crecio": {
    intro: { title: "CRECER EXIGE ORDEN", conclusion: "CRECER CAMBIA LA FORMA DE OPERAR", cards: ["MÁS MOVIMIENTOS", "MÁS DECISIONES"], cardCopies: ["El volumen exige una lectura más clara.", "Cada cambio necesita responsables y contexto."] },
    flow: { title: "CRECER CAMBIA LA OPERACIÓN", cards: ["AUMENTAN LOS DATOS", "SE REPARTEN LAS RESPONSABILIDADES", "NECESITAS MÁS CONTEXTO"] },
    timeline: { title: "CRECER EXIGE ESTRUCTURA", copies: ["DEJA DE DEPENDER DE LA MEMORIA", "CONSERVA EL CONTEXTO", "COMPARA LO QUE ESTÁ CAMBIANDO"] },
    checklist: { title: "CRECER SIN PERDER VISIBILIDAD", cards: ["ORDENA LA INFORMACIÓN", "DEFINE RESPONSABILIDADES", "MIDE ANTES DE DECIDIR"] },
  },
  "contratar-mas": {
    intro: { title: "ANTES DE CONTRATAR, ENTIENDE", conclusion: "A VECES EL SIGUIENTE PASO ES ORDENAR, NO SUMAR PERSONAS", cards: ["IDENTIFICA EL CUELLO DE BOTELLA", "MIDE LA CARGA REAL"], cardCopies: ["No todo problema se resuelve con más equipo.", "Decide con información sobre tareas y tiempos."] },
    flow: { title: "MÁS PERSONAS NO SIEMPRE RESUELVEN", cards: ["MIRA LA CARGA", "ORDENA EL PROCESO", "CONTRATA CON CRITERIO"] },
    timeline: { title: "ENTIENDE LA NECESIDAD", copies: ["OBSERVA DÓNDE SE FRENA EL TRABAJO", "SEPARA VOLUMEN DE DESORDEN", "ELIGE LA SOLUCIÓN ADECUADA"] },
    checklist: { title: "CRECER EL EQUIPO TAMBIÉN ES UNA DECISIÓN OPERATIVA", cards: ["DEFINE EL PROBLEMA", "CALCULA EL IMPACTO", "CONTRATA CUANDO TENGA SENTIDO"] },
  },
  "delegar-control": {
    intro: { title: "DELEGAR ES CREAR CONTROL", conclusion: "EL CONTROL DEBE QUEDAR EN EL PROCESO", cards: ["DEFINE RESPONSABLES", "CONSERVA LA VISIBILIDAD"], cardCopies: ["Cada persona debe saber qué hacer.", "El negocio no puede depender de una sola persona."] },
    flow: { title: "DELEGA SIN CENTRALIZAR", cards: ["DOCUMENTA", "ASIGNA", "REVISA"] },
    timeline: { title: "UN PROCESO REDUCE LA DEPENDENCIA", copies: ["EXPLICA CÓMO SE HACE", "DEFINE QUIÉN RESPONDE", "MIDE LO QUE OCURRE"] },
    checklist: { title: "DELEGA Y CONSERVA CONTEXTO", cards: ["TAREAS CLARAS", "RESPONSABLES VISIBLES", "DECISIONES CON INFORMACIÓN"] },
  },
  "cobrar-parte-vender": {
    intro: { title: "COBRAR ES PARTE DE VENDER", conclusion: "UNA RELACIÓN COMERCIAL NECESITA CLARIDAD", cards: ["ACUERDA EL COBRO", "HAZ SEGUIMIENTO"], cardCopies: ["Define valor, fecha y condiciones.", "Cobrar no debería depender de la incomodidad."] },
    flow: { title: "VENDER NO TERMINA CON EL SÍ", cards: ["ACUERDA", "REGISTRA", "DA SEGUIMIENTO"] },
    timeline: { title: "COBRAR CLARO PROTEGE LA RELACIÓN", copies: ["DEFINE LAS CONDICIONES", "CONSERVA EL CONTEXTO", "ACTÚA A TIEMPO"] },
    checklist: { title: "COBRAR BIEN CUIDA EL NEGOCIO", cards: ["HABLA CLARO", "CUMPLE LO ACORDADO", "MANTÉN LA RELACIÓN"] },
  },
  "condiciones-pago": {
    intro: { title: "UNA VENTA NECESITA UN ACUERDO", conclusion: "EL CUÁNDO Y EL CÓMO TAMBIÉN IMPORTAN", cards: ["DEFINE EL PLAZO", "ANTICIPA EL IMPACTO"], cardCopies: ["La fecha de pago hace parte del acuerdo.", "Cada condición afecta tu operación."] },
    flow: { title: "DEFINE CÓMO PAGARÁ", cards: ["ACUERDA EL PLAZO", "REGISTRA LA CONDICIÓN", "HAZ SEGUIMIENTO"] },
    timeline: { title: "EL PAGO CAMBIA TU OPERACIÓN", copies: ["ACLARA CUÁNDO COBRAS", "CALCULA LO QUE DEBES ESPERAR", "PROTEGE TU FLUJO DE CAJA"] },
    checklist: { title: "UN ACUERDO EVITA CONFUSIONES", cards: ["PLAZO DEFINIDO", "CONDICIONES REGISTRADAS", "SEGUIMIENTO A TIEMPO"] },
  },
  "plazo-cliente": {
    intro: { title: "DAR PLAZO TAMBIÉN FINANCIA", conclusion: "ESPERAR POR EL DINERO TAMBIÉN TIENE UN COSTO", cards: ["MIDE TU CAPACIDAD", "DECIDE CON CONTEXTO"], cardCopies: ["No todos los negocios pueden esperar igual.", "El plazo debe responder a la operación."] },
    flow: { title: "DAR PLAZO ES DECIDIR", cards: ["EVALÚA", "ACUERDA", "CONTROLA"] },
    timeline: { title: "ANTES DE ESPERAR, ENTIENDE", copies: ["CALCULA EL TIEMPO", "MIRA TUS COMPROMISOS", "DEFINE UNA CONDICIÓN SOSTENIBLE"] },
    checklist: { title: "VENDER A PLAZO CAMBIA TU CAJA", cards: ["CONOCE EL COSTO", "ELIGE EL PLAZO", "HAZ SEGUIMIENTO"] },
  },
};

function VisualIcon({ icon: Icon, tone = "light" }: { icon: LucideIcon; tone?: "light" | "red" }) {
  return <span className={`reader-visual-icon reader-visual-icon-${tone}`} aria-hidden="true"><Icon size={23} strokeWidth={1.9} /></span>;
}

function ReferenceFrame({ eyebrow, title, children, conclusion, variant = "dark", theme = "orbit" }: { eyebrow: string; title: string; children: ReactNode; conclusion?: string; variant?: "light" | "dark"; theme?: string }) {
  return <section className={`reader-reference-frame reader-reference-${variant} reader-theme-${theme}`}><p className="reader-reference-eyebrow">{eyebrow}</p><h3>{title}</h3>{children}{conclusion && <p className="reader-reference-conclusion">{conclusion}</p>}</section>;
}

export function ArticleVisuals({ article, part }: { article: BlogArticle; part: 1 | 2 | 3 | 4 }) {
  const lines = sourceLines(article);
  const fallback = article.summary;
  const theme = articleThemes[article.id] || "orbit";
  const first = sourcePick(lines, .12, fallback);
  const second = sourcePick(lines, .29, fallback);
  const third = sourcePick(lines, .47, fallback);
  const fourth = sourcePick(lines, .65, fallback);
  const fifth = sourcePick(lines, .82, fallback);

  if (part === 1) {
    const visual = conciseVisuals[article.id]?.intro;
    const cards = visual?.cards || [second, fourth];
    const cardCopies = visual?.cardCopies || [third, fifth];
    return <ReferenceFrame theme={theme} variant="light" eyebrow="UNA IDEA DEL ARTÍCULO" title={visual?.title || sourceTitle(first, article.summary)} conclusion={visual?.conclusion || sourceCopy(second, fallback)}><div className="reader-reference-columns">{cards.map((line, index) => <div className={`reader-reference-column${index === 1 ? " accent" : ""}`} key={`${line}-${index}`}><VisualIcon icon={comparisonIcons[index]} tone={index === 1 ? "red" : "light"} /><span>TEXTO / 0{index + 1}</span><strong>{visual ? line : sourceCardTitle(line, article.summary)}</strong><p>{visual ? cardCopies[index] : sourceCopy(cardCopies[index], fallback)}</p></div>)}</div></ReferenceFrame>;
  }
  if (part === 2) {
    const visual = conciseVisuals[article.id]?.flow;
    const cards = visual?.cards || [first, second, third];
    return <ReferenceFrame theme={theme} eyebrow="RECORRIDO DEL ARTÍCULO" title={visual?.title || sourceTitle(second, article.summary)}><div className="reader-reference-flow">{cards.map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={flowIcons[index]} tone={index === 1 ? "red" : "light"} /><span>0{index + 1}</span><strong>{visual ? line : sourceCardTitle(line, article.summary)}</strong>{index < 2 && <i><ArrowUpRight size={18} /></i>}</div>)}</div></ReferenceFrame>;
  }
  if (part === 3) {
    const visual = conciseVisuals[article.id]?.timeline;
    const copies = visual?.copies || [second, third, fourth];
    return <ReferenceFrame theme={theme} variant="light" eyebrow="SECUENCIA DEL CONTENIDO" title={visual?.title || sourceTitle(third, article.summary)}><div className="reader-reference-timeline">{copies.map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={timelineIcons[index]} tone={index === 1 ? "red" : "light"} /><span>{index + 1}</span><p>{visual ? line : sourceCopy(line, fallback)}</p></div>)}</div></ReferenceFrame>;
  }
  const visual = conciseVisuals[article.id]?.checklist;
  const cards = visual?.cards || [third, fourth, fifth];
  return <ReferenceFrame theme={theme} eyebrow="SEÑALES DEL MISMO BLOG" title={visual?.title || sourceTitle(fourth, article.summary)}><div className="reader-reference-checklist">{cards.map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={checklistIcons[index]} tone={index === 1 ? "red" : "light"} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{visual ? line : sourceCardTitle(line, article.summary)}</strong></div>)}</div></ReferenceFrame>;
}
