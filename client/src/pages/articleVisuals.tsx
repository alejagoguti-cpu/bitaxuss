import { ArrowRight, Check, GitBranch } from "lucide-react";
import type { BlogArticle } from "./blogData";

type VisualPreset = {
  eyebrow: string;
  title: string;
  steps: [string, string, string];
  before: string;
  after: string;
  beforePoints: string[];
  afterPoints: string[];
  note: string;
};

const visualPresets: Record<string, VisualPreset> = {
  "control-ventas": { eyebrow: "Lectura de caja", title: "Vender es solo el primer movimiento", steps: ["Facturado", "Recibido", "Disponible"], before: "Mirar solo las ventas", after: "Leer el dinero completo", beforePoints: ["Confunde facturación con caja", "Llega tarde a los compromisos"], afterPoints: ["Relaciona ingresos y tiempos", "Permite decidir con contexto"], note: "La señal importante no es únicamente cuánto vendiste, sino cuánto puedes sostener." },
  "gastos-operacion": { eyebrow: "Mapa de costos", title: "El costo real aparece cuando conectas las piezas", steps: ["Fijos", "Variables", "Recurrentes"], before: "Recortar por intuición", after: "Entender la estructura", beforePoints: ["Ve gastos aislados", "Pierde costos silenciosos"], afterPoints: ["Detecta duplicidades", "Protege lo que sí aporta"], note: "Un ahorro puntual no siempre significa que operar el negocio cueste menos." },
  "cierre-mes": { eyebrow: "Cierre con contexto", title: "Un cierre útil explica cómo llegaste al saldo", steps: ["Movimientos", "Conciliación", "Lectura"], before: "Cerrar mirando el saldo", after: "Cerrar entendiendo el mes", beforePoints: ["Solo registra un número", "Deja preguntas abiertas"], afterPoints: ["Reconstruye el recorrido", "Deja decisiones listas"], note: "El cierre no es una fotografía: es una explicación breve y comprobable." },
  "empresa-crecio": { eyebrow: "Escala operativa", title: "Crecer cambia la forma de guardar el contexto", steps: ["Más clientes", "Más movimientos", "Más sistema"], before: "Controlar desde la memoria", after: "Diseñar una operación", beforePoints: ["Depende de una persona", "Se fragmenta con el volumen"], afterPoints: ["Distribuye responsabilidades", "Conserva trazabilidad"], note: "La operación debe evolucionar antes de que el crecimiento la vuelva frágil." },
  "contratar-mas": { eyebrow: "Capacidad real", title: "Más personas no corrigen un proceso confuso", steps: ["Problema", "Proceso", "Capacidad"], before: "Contratar para apagar", after: "Ordenar antes de crecer", beforePoints: ["Multiplica pasos innecesarios", "Traslada la confusión al equipo"], afterPoints: ["Aclara responsables", "Libera tiempo operativo"], note: "La pregunta no es cuántas personas faltan, sino qué parte del sistema está frenando." },
  "delegar-control": { eyebrow: "Delegación", title: "Delegar también es conservar el criterio", steps: ["Criterio", "Proceso", "Seguimiento"], before: "Pasar tareas", after: "Transferir control", beforePoints: ["Todo vuelve al fundador", "No hay una forma común"], afterPoints: ["El equipo decide mejor", "La información queda disponible"], note: "Delegar no es desaparecer: es construir una operación que pueda avanzar contigo o sin ti." },
  "cobrar-parte-vender": { eyebrow: "Cobro y relación", title: "Cobrar bien empieza cuando vendes", steps: ["Acuerdo", "Fecha", "Seguimiento"], before: "Cobrar al final", after: "Acordar desde el inicio", beforePoints: ["El cobro parece incómodo", "El cliente recibe señales ambiguas"], afterPoints: ["El acuerdo queda visible", "La relación gana claridad"], note: "Un cobro claro protege la relación porque evita conversaciones que debieron ocurrir antes." },
  "condiciones-pago": { eyebrow: "Condiciones", title: "Una venta completa también define cuándo llega el dinero", steps: ["Qué", "Cuándo", "Cómo"], before: "Dejarlo para después", after: "Hacerlo parte del acuerdo", beforePoints: ["Abre interpretaciones", "Desordena la caja"], afterPoints: ["Alinea expectativas", "Facilita el seguimiento"], note: "Las condiciones de pago no son una nota al pie: son parte del valor que estás vendiendo." },
  "plazo-cliente": { eyebrow: "Decisión de plazo", title: "Dar tiempo también tiene un costo para el negocio", steps: ["Venta", "Espera", "Caja"], before: "Aceptar sin medir", after: "Decidir con contexto", beforePoints: ["Financia al cliente sin verlo", "Compromete recursos futuros"], afterPoints: ["Mide el tiempo de espera", "Protege la continuidad"], note: "Cada plazo que concedes cambia la velocidad con la que tu negocio puede moverse." },
};

export function ArticleVisuals({ article }: { article: BlogArticle }) {
  const preset = visualPresets[article.id] || visualPresets["control-ventas"];
  return <div className="article-visual-system" aria-label={`Recursos visuales sobre ${article.title}`}>
    <section className="reader-diagram reader-diagram-premium">
      <div className="reader-visual-topline"><p className="blog-eyebrow">{preset.eyebrow}</p><span>BITAXUS / 01</span></div>
      <h3>{preset.title}</h3>
      <div className="reader-flow-premium">{preset.steps.map((step, index) => <div className="reader-flow-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < preset.steps.length - 1 && <ArrowRight />}</div>)}</div>
      <div className="reader-visual-caption"><GitBranch /><span>De una operación aislada a una lectura conectada.</span></div>
    </section>
    <section className="reader-comparison reader-comparison-premium">
      <div className="reader-visual-topline"><p className="blog-eyebrow">Comparación Bitaxus</p><span>BITAXUS / 02</span></div>
      <div className="reader-comparison-grid"><div><span>Antes</span><strong>{preset.before}</strong><ul>{preset.beforePoints.map((point) => <li key={point}>{point}</li>)}</ul></div><div className="better"><span>Con más contexto</span><strong>{preset.after}</strong><ul>{preset.afterPoints.map((point) => <li key={point}>{point}</li>)}</ul></div></div>
      <p><Check /> {preset.note}</p>
    </section>
  </div>;
}
