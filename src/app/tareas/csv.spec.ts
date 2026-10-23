import { tarea } from '../../testing/datos';
import { aCsv } from './csv';

describe('aCsv', () => {
  it('escribe la cabecera y una línea por tarea', () => {
    const tareas = [
      tarea({ titulo: 'Configurar Jenkins', minutos: 120 }),
      tarea({ titulo: 'Café', minutos: 15, hecha: true }),
    ];

    expect(aCsv(tareas).split('\n')).toEqual([
      'titulo;minutos;hecha',
      'Configurar Jenkins;120;no',
      'Café;15;sí',
    ]);
  });

  it('sin tareas, solo la cabecera', () => {
    expect(aCsv([])).toBe('titulo;minutos;hecha');
  });
});
