/** Una tarea, tal como la devuelve la API. */
export interface Tarea {
  id: number;
  titulo: string;
  /** Lo que se calcula que va a durar, en minutos. */
  minutos: number;
  hecha: boolean;
}
