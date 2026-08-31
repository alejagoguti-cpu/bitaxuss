from pathlib import Path
import json

source = Path('/home/ubuntu/bitaxuss/client/src/pages/blogContent.txt').read_text()
lines = source.splitlines()
starts = [1, 91, 167, 247, 338, 420, 499, 576, 666]
ends = starts[1:] + [len(lines) + 1]
meta = [
    ('control-ventas', 'Control de negocio', 'Vender más no siempre significa que te esté quedando más', 'Las ventas pueden subir mientras la tranquilidad y la caja se aprietan. Entender qué queda disponible es parte de crecer.'),
    ('gastos-operacion', 'Control de negocio', 'Tu negocio tiene más gastos de los que recuerdas', 'Ahorrar en algunos costos no siempre significa que operar el negocio esté costando menos.'),
    ('cierre-mes', 'Control de negocio', 'Cerrar el mes no es mirar cuánto quedó en la cuenta', 'Un buen cierre no consiste solamente en conocer el saldo final, sino en poder explicar cómo llegaste hasta ahí.'),
    ('empresa-crecio', 'Emprendimiento', 'Tu empresa creció. ¿Tu forma de manejarla también?', 'La operación puede cambiar más rápido que la manera en que la empresa conserva y entiende su información.'),
    ('contratar-mas', 'Emprendimiento', 'Contratar más gente no siempre significa que tu empresa está creciendo', 'A veces la operación necesita una mejor forma de funcionar antes que más personas.'),
    ('delegar-control', 'Emprendimiento', 'Si todo sigue pasando por ti, todavía no has delegado del todo', 'Delegar tareas no basta: también hay que construir procesos que mantengan el control sin depender de una sola persona.'),
    ('cobrar-parte-vender', 'Clientes y ventas', '¿Por qué a tantos emprendedores les cuesta cobrar?', 'Cobrar también es parte de vender y necesita claridad, seguimiento y contexto.'),
    ('condiciones-pago', 'Clientes y ventas', 'El cliente te dijo que sí. ¿Dejaste claro cuándo y cómo te va a pagar?', 'Una venta no está completamente acordada si todavía no está claro cómo y cuándo se va a pagar.'),
    ('plazo-cliente', 'Clientes y ventas', 'Darle plazo a un cliente también es una decisión de tu negocio', 'Aceptar que un cliente pague después también significa decidir cuánto tiempo puede esperar tu negocio por ese dinero.'),
]
images_by_article = {
    'control-ventas': '/blog/ventas-caja.webp',
    'gastos-operacion': '/blog/gastos-operacion.webp',
    'cierre-mes': '/blog/cierre-mes.webp',
    'empresa-crecio': '/blog/empresa-crecio.webp',
    'contratar-mas': '/blog/contratar-equipo.webp',
    'delegar-control': '/blog/delegar-equipo.webp',
    'cobrar-parte-vender': '/blog/cobrar-emprendedor.webp',
    'condiciones-pago': '/blog/condiciones-cliente.webp',
    'plazo-cliente': '/blog/plazo-cliente.webp',
}

def clean_segment(segment):
    segment = [line.strip() for line in segment if line.strip()]
    # Locate the author line; everything after it is article body.
    author_index = next((i for i, line in enumerate(segment) if line.lower().startswith('por alejandra torres')), 3)
    return segment[author_index + 1:]

records = []
for i, (start, end) in enumerate(zip(starts, ends)):
    segment = lines[start - 1:end - 1]
    body = clean_segment(segment)
    records.append({
        'id': meta[i][0],
        'category': meta[i][1],
        'title': meta[i][2],
        'summary': meta[i][3],
        'image': images_by_article[meta[i][0]],
        'featured': i == 0,
        'content': '\n'.join(body),
    })

out = Path('/home/ubuntu/bitaxuss/client/src/pages/blogData.ts')
parts = [
    'export const asset = (source: string) => `${import.meta.env.BASE_URL}${source.replace(/^\\//, "")}`;',
    'export const blogPath = `${import.meta.env.BASE_URL}blog`;',
    'export const loginUrl = "https://app.bitaxus.com/login";',
    '',
    'export const articles = ' + json.dumps(records, ensure_ascii=False, indent=2) + ' as const;',
    '',
    'export type BlogArticle = (typeof articles)[number];',
    '',
]
out.write_text('\n'.join(parts))
print(f'Generated {len(records)} articles with {sum(len(r["content"].splitlines()) for r in records)} body lines')
