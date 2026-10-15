import { TestBed } from '@angular/core/testing';
import { Avisos, DURACION_AVISO } from './avisos';

describe('Avisos', () => {
  let avisos: Avisos;

  beforeEach(() => {
    // Un reloj de mentira: el tiempo solo pasa cuando el test lo dice
    vi.useFakeTimers();
    avisos = TestBed.inject(Avisos);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('enseña el mensaje', () => {
    avisos.mostrar('Hola');

    expect(avisos.mensaje()).toBe('Hola');
  });

  it('lo quita a los tres segundos, y no antes', () => {
    avisos.mostrar('Hola');

    vi.advanceTimersByTime(DURACION_AVISO - 1);
    expect(avisos.mensaje()).toBe('Hola');

    vi.advanceTimersByTime(1);
    expect(avisos.mensaje()).toBeNull();
  });

  it('un aviso nuevo empieza a contar de cero', () => {
    avisos.mostrar('Primero');
    vi.advanceTimersByTime(2000);

    avisos.mostrar('Segundo');
    vi.advanceTimersByTime(2000);

    expect(avisos.mensaje()).toBe('Segundo');
  });
});
