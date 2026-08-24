import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { ArticleReader } from "./Blog";
import { articles } from "./blogData";

const appBasePath = import.meta.env.BASE_URL === "/"
  ? ""
  : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function ArticlePage() {
  const [, params] = useRoute(`${appBasePath}/blog/article/:id`);
  const [, setLocation] = useLocation();
  const article = articles.find((item) => item.id === params?.id);

  useEffect(() => {
    document.title = article ? `${article.title} | Blog Bitaxus` : "Artículo no encontrado | Blog Bitaxus";
    return () => {
      document.title = "Blog Bitaxus | Ideas para entender mejor tu negocio";
    };
  }, [article]);

  if (!article) {
    return <main className="blog-article-missing"><div><p className="blog-eyebrow">Blog Bitaxus</p><h1>Este artículo no está disponible.</h1><button type="button" onClick={() => setLocation(`${appBasePath}/blog`)}>Volver al blog</button></div></main>;
  }

  return <main className="blog-page article-page"><ArticleReader article={article} onClose={() => setLocation(`${appBasePath}/blog`)} /></main>;
}
