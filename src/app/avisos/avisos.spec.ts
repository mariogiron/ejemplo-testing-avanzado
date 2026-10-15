import { TestBed } from '@angular/core/testing';
import { Avisos, DURACION_AVISO } from './avisos';

describe('Avisos', () => {
  let avisos: Avisos;

  beforeEach(() => {
    // Un reloj de mentira: el tiempo solo pasa cuando el test lo dice
    jest.useFakeTimers();
    avisos = TestBed.inject(Avisos);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ✍️ A mano: los tests de Avisos, mirando avisos.ts.
});
