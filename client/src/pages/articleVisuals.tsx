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
  cards?: string[];
  copies?: string[];
};

const conciseVisuals: Record<string, Partial<Record<"flow" | "timeline" | "checklist", ConciseVisual>>> = {
  "gastos-operacion": {
    flow: {
      title: "POR ESO NO CREO QUE LA CONVERSACIÓN DEBA REDUCIRSE A IDENTIFICAR “GASTOS HORMIGA”",
      cards: [
        "LO MÁS DIFÍCIL ES RECORDAR TODOS TUS GASTOS.",
        "LA CONVERSACIÓN NO DEBE REDUCIRSE A IDENTIFICAR “GASTOS HORMIGA”.",
        "BUSCAS CLARIDAD, NO SOLO GASTAR MENOS.",
      ],
    },
    timeline: {
      title: "YA NO BUSCAS SOLO GASTAR MENOS. ENTIENDES LA ESTRUCTURA DE TU OPERACIÓN.",
      copies: [
        "AHORRAR EN UN COSTO NO SIEMPRE REDUCE EL COSTO TOTAL.",
        "CADA NUEVA HERRAMIENTA CAMBIA LA ESTRUCTURA DEL NEGOCIO.",
        "RELACIONAR CADA SALIDA CON SU CONTEXTO MEJORA LAS DECISIONES.",
      ],
    },
    checklist: {
      title: "CONOCER EL VALOR DE UNA SALIDA ES ÚTIL. ENTENDER SU CONTEXTO ES MEJOR.",
      cards: [
        "ENTIENDE DÓNDE Y POR QUÉ GASTAS.",
        "RELACIONA CADA SALIDA CON SU CONTEXTO.",
        "UN MOVIMIENTO AISLADO SOLO MUESTRA QUE SALIÓ DINERO.",
      ],
    },
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

  if (part === 1) return <ReferenceFrame theme={theme} variant="light" eyebrow="UNA IDEA DEL ARTÍCULO" title={sourceTitle(first, article.summary)} conclusion={sourceCopy(second, fallback)}><div className="reader-reference-columns"><div className="reader-reference-column"><VisualIcon icon={comparisonIcons[0]} /><span>TEXTO / 01</span><strong>{sourceCardTitle(second, article.summary)}</strong><p>{sourceCopy(third, fallback)}</p></div><div className="reader-reference-column accent"><VisualIcon icon={comparisonIcons[1]} tone="red" /><span>TEXTO / 02</span><strong>{sourceCardTitle(fourth, article.summary)}</strong><p>{sourceCopy(fifth, fallback)}</p></div></div></ReferenceFrame>;
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
