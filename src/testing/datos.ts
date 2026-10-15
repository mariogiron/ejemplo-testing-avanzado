import { Tarea } from '../app/tareas/tarea';

let siguienteId = 1;

/**
 * Una tarea de prueba. Lleva valores razonables en todo, y cada test cambia solo lo que le importa:
 * tarea({ hecha: true }), tarea({ titulo: 'Café' }).
 */
export function tarea(cambios: Partial<Tarea> = {}): Tarea {
  return { id: siguienteId++, titulo: 'Una tarea', minutos: 30, hecha: false, ...cambios };
}
