import { tarea } from '../../testing/datos';
import { filtrarPorTexto, resumir } from './resumen';

describe('resumir', () => {
  // ✍️ A mano: los tests de resumir, mirando resumen.ts.
});

describe('filtrarPorTexto', () => {
  const tareas = [
    tarea({ titulo: 'Configurar Jenkins' }),
    tarea({ titulo: 'Café con el equipo' }),
    tarea({ titulo: 'Revisar los ejercicios' }),
  ];

  // ✍️ A mano: los tests de filtrarPorTexto, mirando resumen.ts.
});
