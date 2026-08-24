export const asset = (source: string) => `${import.meta.env.BASE_URL}${source.replace(/^\//, "")}`;
export const blogPath = `${import.meta.env.BASE_URL}blog`;
export const loginUrl = "https://app.bitaxus.com/login";

export const articles = [
  {
    id: "plataformas",
    category: "Global",
    title: "Plataformas, pagos inmediatos y dólares digitales: así está cambiando la forma de recibir ingresos en Latam.",
    summary: "Trabajar con clientes en el exterior abre oportunidades, pero también nuevas preguntas sobre cobros, tasas y control de tu operación.",
    image: "/blog/plataformas-pagos.webp",
    featured: true,
  },
  {
    id: "exterior",
    category: "Global",
    title: "Si recibes pagos del exterior, guarda esto antes de mover tu dinero",
    summary: "Qué revisar antes de mover recursos que llegan desde otros países y mantener claridad sobre la operación.",
    image: "/blog/pagos-exterior.webp",
    featured: false,
  },
  {
    id: "primer-pago",
    category: "Emprendimiento",
    title: "Tu primer pago internacional: qué revisar antes de decirle sí al cliente.",
    summary: "Una guía para dar el siguiente paso cuando tu negocio empieza a trabajar con el exterior.",
    image: "/blog/primer-pago.webp",
    featured: false,
  },
  {
    id: "tasa",
    category: "Control de negocio",
    title: "La tasa que ves en Google no es la que llega a tu bolsillo",
    summary: "Entender la diferencia entre una referencia de mercado y el valor final que recibe tu operación.",
    image: "/blog/tasa-google.webp",
    featured: false,
  },
] as const;

export type BlogArticle = (typeof articles)[number];
