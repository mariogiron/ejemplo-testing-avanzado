// API de prácticas del módulo 8: una lista de tareas en memoria.
// Node sin dependencias. Arranca con: node servidores/api.mjs
import http from 'node:http';

const PUERTO = Number(process.env.PUERTO ?? 3000);

let tareas = [
  { id: 1, titulo: 'Preparar la clase de testing', minutos: 90, hecha: true },
  { id: 2, titulo: 'Revisar los ejercicios', minutos: 45, hecha: false },
  { id: 3, titulo: 'Configurar Jenkins', minutos: 120, hecha: false },
  { id: 4, titulo: 'Café con el equipo', minutos: 15, hecha: true },
  { id: 5, titulo: 'Escribir el informe', minutos: 60, hecha: false },
];
let siguienteId = 6;

async function leerJson(req) {
  let texto = '';
  for await (const trozo of req) texto += trozo;
  return texto ? JSON.parse(texto) : {};
}

async function atender(req) {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && pathname === '/api/tareas') {
    return { estado: 200, cuerpo: tareas };
  }
  if (req.method === 'POST' && pathname === '/api/tareas') {
    const { titulo, minutos } = await leerJson(req);
    if (!titulo?.trim()) {
      return { estado: 400, cuerpo: { error: 'Falta el título' } };
    }
    const tarea = {
      id: siguienteId++,
      titulo: titulo.trim(),
      minutos: Number(minutos) || 0,
      hecha: false,
    };
    tareas = [...tareas, tarea];
    return { estado: 201, cuerpo: tarea };
  }
  const completar = /^\/api\/tareas\/(\d+)$/.exec(pathname);
  if (req.method === 'PATCH' && completar) {
    const tarea = tareas.find((t) => t.id === Number(completar[1]));
    if (!tarea) {
      return { estado: 404, cuerpo: { error: 'No existe esa tarea' } };
    }
    tarea.hecha = true;
    return { estado: 200, cuerpo: tarea };
  }
  return { estado: 404, cuerpo: { error: 'No existe esa ruta' } };
}

http
  .createServer(async (req, res) => {
    const { estado, cuerpo } = await atender(req).catch((e) => ({
      estado: 500,
      cuerpo: { error: e.message },
    }));
    console.log(
      `[api] ${req.method} ${req.url} → ${estado} (usuario: ${req.headers['x-usuario'] ?? '—'})`,
    );
    res.writeHead(estado, { 'content-type': 'application/json' });
    res.end(JSON.stringify(cuerpo));
  })
  .listen(PUERTO, () => console.log(`API de tareas en http://localhost:${PUERTO}`));
