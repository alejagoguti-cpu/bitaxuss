import type { ReactNode } from "react";
import { ArrowUpRight, BadgeCheck, ChartNoAxesCombined, CircleDollarSign, Clock3, FileCheck2, Gauge, ListChecks, Search, ShieldCheck, UsersRound, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

function sourceTitle(line: string, fallback: string) {
  const clean = line.replace(/[.!?]+$/, "");
  return clean.length > 92 ? `${clean.slice(0, 89).trim()}…` : clean;
}

function sourceCopy(line: string, fallback: string) {
  return line.length > 190 ? `${line.slice(0, 187).trim()}…` : line || fallback;
}

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

  if (part === 1) return <ReferenceFrame theme={theme} variant="light" eyebrow="UNA IDEA DEL ARTÍCULO" title={sourceTitle(first, article.summary)} conclusion={sourceCopy(second, fallback)}><div className="reader-reference-columns"><div className="reader-reference-column"><VisualIcon icon={comparisonIcons[0]} /><span>TEXTO / 01</span><strong>{sourceTitle(second, article.summary)}</strong><p>{sourceCopy(third, fallback)}</p></div><div className="reader-reference-column accent"><VisualIcon icon={comparisonIcons[1]} tone="red" /><span>TEXTO / 02</span><strong>{sourceTitle(fourth, article.summary)}</strong><p>{sourceCopy(fifth, fallback)}</p></div></div></ReferenceFrame>;
  if (part === 2) return <ReferenceFrame theme={theme} eyebrow="RECORRIDO DEL ARTÍCULO" title={sourceTitle(second, article.summary)}><div className="reader-reference-flow">{[first, second, third].map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={flowIcons[index]} tone={index === 1 ? "red" : "light"} /><span>0{index + 1}</span><strong>{sourceTitle(line, article.summary)}</strong>{index < 2 && <i><ArrowUpRight size={18} /></i>}</div>)}</div></ReferenceFrame>;
  if (part === 3) return <ReferenceFrame theme={theme} variant="light" eyebrow="SECUENCIA DEL CONTENIDO" title={sourceTitle(third, article.summary)}><div className="reader-reference-timeline">{[second, third, fourth].map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={timelineIcons[index]} tone={index === 1 ? "red" : "light"} /><span>{index + 1}</span><p>{sourceCopy(line, fallback)}</p></div>)}</div></ReferenceFrame>;
  return <ReferenceFrame theme={theme} eyebrow="SEÑALES DEL MISMO BLOG" title={sourceTitle(fourth, article.summary)}><div className="reader-reference-checklist">{[third, fourth, fifth].map((line, index) => <div key={`${line}-${index}`}><VisualIcon icon={checklistIcons[index]} tone={index === 1 ? "red" : "light"} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{sourceTitle(line, article.summary)}</strong></div>)}</div></ReferenceFrame>;
}
