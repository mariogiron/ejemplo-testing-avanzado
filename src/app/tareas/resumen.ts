import { Tarea } from './tarea';

export interface Resumen {
  total: number;
  hechas: number;
  pendientes: number;
  /** El porcentaje de tareas hechas, redondeado a un número entero. */
  porcentaje: number;
}

/** Cuenta las tareas hechas y pendientes. */
export function resumir(tareas: Tarea[]): Resumen {
  const hechas = tareas.filter((tarea) => tarea.hecha).length;
  return {
    total: tareas.length,
    hechas,
    pendientes: tareas.length - hechas,
    porcentaje: tareas.length === 0 ? 0 : Math.round((hechas / tareas.length) * 100),
  };
}

/** Las tareas cuyo título contiene el texto, sin distinguir mayúsculas ni tildes. */
export function filtrarPorTexto(tareas: Tarea[], texto: string): Tarea[] {
  const buscado = normalizar(texto.trim());
  return buscado ? tareas.filter((tarea) => normalizar(tarea.titulo).includes(buscado)) : tareas;
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
