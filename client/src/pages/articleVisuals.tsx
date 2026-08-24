import type { BlogArticle } from "./blogData";

type VisualPreset = {
  eyebrow: string;
  title: string;
  leftLabel: string;
  leftTitle: string;
  leftCopy: string;
  rightLabel: string;
  rightTitle: string;
  rightCopy: string;
  conclusion: string;
};

const visualPresets: Record<string, VisualPreset> = {
  "control-ventas": { eyebrow: "DOS FORMAS DE LEER EL MISMO CRECIMIENTO", title: "Más movimiento no siempre es más claridad.", leftLabel: "NEGOCIO A", leftTitle: "Vende más", leftCopy: "Cobra tarde, acumula pendientes y decide con información incompleta.", rightLabel: "NEGOCIO B", rightTitle: "Controla mejor", rightCopy: "Cobra a tiempo, conoce sus compromisos y sabe qué puede mover.", conclusion: "La claridad suele ganarle al volumen." },
  "gastos-operacion": { eyebrow: "DOS FORMAS DE ENTENDER LOS COSTOS", title: "Ahorrar no siempre significa operar mejor.", leftLabel: "NEGOCIO A", leftTitle: "Recorta gastos", leftCopy: "Elimina costos visibles, pero no ve cómo cambia el costo total de operar.", rightLabel: "NEGOCIO B", rightTitle: "Lee su estructura", rightCopy: "Conoce sus gastos recurrentes y decide qué sostiene realmente el negocio.", conclusion: "El costo real aparece cuando conectas las piezas." },
  "cierre-mes": { eyebrow: "DOS FORMAS DE CERRAR EL MES", title: "Un saldo no siempre cuenta toda la historia.", leftLabel: "NEGOCIO A", leftTitle: "Mira cuánto quedó", leftCopy: "Cierra con un número, pero deja movimientos y pendientes sin explicar.", rightLabel: "NEGOCIO B", rightTitle: "Entiende cómo llegó", rightCopy: "Concilia, relaciona movimientos y empieza el siguiente mes con contexto.", conclusion: "Cerrar bien es poder explicar lo que pasó." },
  "empresa-crecio": { eyebrow: "DOS FORMAS DE LEER EL CRECIMIENTO", title: "Más clientes no siempre significan más control.", leftLabel: "NEGOCIO A", leftTitle: "Crece desde la memoria", leftCopy: "Acumula personas, movimientos y decisiones que dependen de unos pocos.", rightLabel: "NEGOCIO B", rightTitle: "Diseña su operación", rightCopy: "Distribuye responsabilidades y conserva el contexto mientras crece.", conclusion: "Crecer también cambia la forma de organizarse." },
  "contratar-mas": { eyebrow: "DOS FORMAS DE CREAR CAPACIDAD", title: "Más personas no siempre resuelven el problema.", leftLabel: "NEGOCIO A", leftTitle: "Contrata para apagar", leftCopy: "Suma manos a procesos confusos y termina multiplicando las interrupciones.", rightLabel: "NEGOCIO B", rightTitle: "Ordena primero", rightCopy: "Aclara responsabilidades y libera al equipo para hacer mejor su trabajo.", conclusion: "La capacidad empieza por un proceso que se entiende." },
  "delegar-control": { eyebrow: "DOS FORMAS DE DELEGAR", title: "Pasar tareas no siempre es transferir control.", leftLabel: "NEGOCIO A", leftTitle: "Reparte pendientes", leftCopy: "Las decisiones vuelven al fundador porque nadie comparte el mismo criterio.", rightLabel: "NEGOCIO B", rightTitle: "Construye un sistema", rightCopy: "Deja procesos visibles para que el equipo avance con autonomía.", conclusion: "Delegar también es conservar el criterio." },
  "cobrar-parte-vender": { eyebrow: "DOS FORMAS DE ENTENDER EL COBRO", title: "Cobrar no debería empezar después de vender.", leftLabel: "NEGOCIO A", leftTitle: "Cobra al final", leftCopy: "Deja fechas y condiciones abiertas, y convierte el seguimiento en una tensión.", rightLabel: "NEGOCIO B", rightTitle: "Acuerda desde el inicio", rightCopy: "Hace visible cuándo y cómo se paga, cuidando la relación con el cliente.", conclusion: "La claridad también forma parte de la venta." },
  "condiciones-pago": { eyebrow: "DOS FORMAS DE CERRAR UN ACUERDO", title: "Una venta no termina cuando el cliente dice que sí.", leftLabel: "NEGOCIO A", leftTitle: "Deja lo importante para después", leftCopy: "Abre interpretaciones sobre fechas, formas de pago y próximos pasos.", rightLabel: "NEGOCIO B", rightTitle: "Define el acuerdo completo", rightCopy: "Alinea expectativas y protege el flujo de caja desde el primer día.", conclusion: "Las condiciones de pago también son parte del valor." },
  "plazo-cliente": { eyebrow: "DOS FORMAS DE DAR PLAZO", title: "Esperar también es una decisión financiera.", leftLabel: "NEGOCIO A", leftTitle: "Acepta sin medir", leftCopy: "Financia al cliente sin ver cuánto tiempo puede sostener esa espera.", rightLabel: "NEGOCIO B", rightTitle: "Decide con contexto", rightCopy: "Conoce el impacto del plazo y protege la continuidad de su operación.", conclusion: "Cada plazo cambia la velocidad del negocio." },
};

export function ArticleVisuals({ article }: { article: BlogArticle }) {
  const preset = visualPresets[article.id] || visualPresets["control-ventas"];
  return <section className="article-visual-system reader-comparison-reference" aria-label={`Comparación sobre ${article.title}`}>
    <p className="reader-reference-eyebrow">{preset.eyebrow}</p>
    <h3>{preset.title}</h3>
    <div className="reader-reference-columns">
      <div className="reader-reference-column">
        <span>{preset.leftLabel}</span>
        <strong>{preset.leftTitle}</strong>
        <p>{preset.leftCopy}</p>
      </div>
      <div className="reader-reference-column accent">
        <span>{preset.rightLabel}</span>
        <strong>{preset.rightTitle}</strong>
        <p>{preset.rightCopy}</p>
      </div>
    </div>
    <p className="reader-reference-conclusion">{preset.conclusion}</p>
  </section>;
}
