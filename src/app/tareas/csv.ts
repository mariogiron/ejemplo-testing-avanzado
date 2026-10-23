import { Tarea } from './tarea';

/** Las tareas como texto CSV, separado por punto y coma, con una línea de cabecera. */
export function aCsv(tareas: Tarea[]): string {
  const filas = tareas.map((t) => [t.titulo, t.minutos, t.hecha ? 'sí' : 'no'].join(';'));
  return ['titulo;minutos;hecha', ...filas].join('\n');
}
