import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { tarea } from '../../testing/datos';
import { Avisos } from '../avisos/avisos';
import { Tarea } from './tarea';
import { TareasApi } from './tareas-api';
import { TareasStore } from './tareas-store';

describe('TareasStore', () => {
  let store: TareasStore;
  /** Espías: funciones de mentira que recuerdan cómo las llamaron y devuelven lo que se les diga. */
  let api: jest.Mocked<Pick<TareasApi, 'listar' | 'crear' | 'completar'>>;
  let avisos: jest.Mocked<Pick<Avisos, 'mostrar'>>;

  beforeEach(() => {
    api = { listar: jest.fn(), crear: jest.fn(), completar: jest.fn() };
    avisos = { mostrar: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        { provide: TareasApi, useValue: api },
        { provide: Avisos, useValue: avisos },
      ],
    });
    store = TestBed.inject(TareasStore);
  });

  // ✍️ A mano: los tests de TareasStore, mirando tareas-store.ts.
});
