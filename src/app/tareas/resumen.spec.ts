import { tarea } from '../../testing/datos';
import { filtrarPorTexto, resumir } from './resumen';

describe('resumir', () => {
  it('cuenta las hechas y las pendientes', () => {
    const tareas = [tarea({ hecha: true }), tarea(), tarea()];

    const resumen = resumir(tareas);

    expect(resumen).toEqual({ total: 3, hechas: 1, pendientes: 2, porcentaje: 33 });
  });

  it('con una lista vacía, el porcentaje es 0 y no NaN', () => {
    expect(resumir([]).porcentaje).toBe(0);
  });

  it('redondea el porcentaje', () => {
    const tareas = [tarea({ hecha: true }), tarea({ hecha: true }), tarea()];

    expect(resumir(tareas).porcentaje).toBe(67);
  });
});

describe('filtrarPorTexto', () => {
  const tareas = [
    tarea({ titulo: 'Configurar Jenkins' }),
    tarea({ titulo: 'Café con el equipo' }),
    tarea({ titulo: 'Revisar los ejercicios' }),
  ];

  it.each([
    ['jenkins', ['Configurar Jenkins']],
    ['JENKINS', ['Configurar Jenkins']],
    ['cafe', ['Café con el equipo']],
    ['  café  ', ['Café con el equipo']],
    ['e', ['Configurar Jenkins', 'Café con el equipo', 'Revisar los ejercicios']],
    ['nada', []],
  ])('con «%s» deja %j', (texto, esperados) => {
    const titulos = filtrarPorTexto(tareas, texto).map((t) => t.titulo);

    expect(titulos).toEqual(esperados);
  });

  it('con el texto vacío devuelve la misma lista', () => {
    expect(filtrarPorTexto(tareas, '')).toBe(tareas);
  });
});
