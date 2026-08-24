from pathlib import Path

path = Path('/home/ubuntu/bitaxuss/client/src/pages/Blog.tsx')
text = path.read_text()
text = text.replace('const categories = ["Todos", "Flujo de Caja", "Pagos y Cobros", "Estrategia"];', 'const categories = ["Todos", "Control de negocio", "Emprendimiento", "Clientes y ventas"];')
old = '''      const categoryMatches = activeCategory === "Todos"
        || (activeCategory === "Flujo de Caja" && article.category === "Control de negocio")
        || (activeCategory === "Pagos y Cobros" && article.category === "Global")
        || (activeCategory === "Estrategia" && article.category === "Emprendimiento");'''
new = '''      const categoryMatches = activeCategory === "Todos" || article.category === activeCategory;'''
if old not in text:
    raise SystemExit('category block not found')
text = text.replace(old, new)
marker = 'export function ArticleReader'
prefix = text[:text.index(marker)]
new_reader = r'''const isArticleHeading = (line: string, index: number, lines: string[]) => {
  if (line.length < 18 || line.length > 105) return false;
  if (/^[¿?]/.test(line) || /[.!,:;]$/.test(line)) return false;
  if (/^(Por |Durante |Cuando |Y |Pero |No |Es |La |Una |Un |A |En |Para |Si |También |Porque |Eso |Ahí |Al |Con |Lo |Los |Las |Hay |Puede |Muchas |Parte |Desde |Cada |Mientras |Por eso|De hecho)/i.test(line)) return false;
  return index > 0 && lines[index - 1].length > 80;
};

function renderArticleBlocks(article: BlogArticle) {
  const lines = article.content.split(/\\n+/).map((line) => line.trim()).filter(Boolean);
  const faqIndex = lines.findIndex((line) => line.toLowerCase() === "preguntas frecuentes");
  return lines.map((line, index) => {
    if (line.toLowerCase() === "preguntas frecuentes") return <h2 key={`heading-${index}`}>Preguntas frecuentes</h2>;
    if (line.startsWith("Bitaxus ·")) return <div className="blog-reader-cta" key={`cta-${index}`}><p className="blog-eyebrow">{line}</p><h3>Cobras. Pagas. Sabes.</h3><p>Una experiencia Bitaxus para conservar el contexto de tus cobros, pagos y movimientos.</p><a href={`${asset("/")}#contacto`} className="blog-primary-cta">Conocer Bitaxus <ArrowRight /></a></div>;
    if (line.startsWith("👉")) return <p className="blog-reader-link" key={`link-${index}`}>{line.replace("👉 ", "")}</p>;
    if (faqIndex >= 0 && index > faqIndex && line.endsWith("?") && line.length < 180) return <h3 className="blog-reader-faq-question" key={`faq-${index}`}>{line}</h3>;
    if (isArticleHeading(line, index, lines)) return <h2 key={`heading-${index}`}>{line}</h2>;
    return <p key={`paragraph-${index}`}>{line}</p>;
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
'''
path.write_text(prefix + new_reader)
print('Updated Blog.tsx with dynamic article renderer')
