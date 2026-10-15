import { TestBed } from '@angular/core/testing';
import type { Mocked } from 'vitest';
import { of, Subject, throwError } from 'rxjs';
import { tarea } from '../../testing/datos';
import { Avisos } from '../avisos/avisos';
import { Tarea } from './tarea';
import { TareasApi } from './tareas-api';
import { TareasStore } from './tareas-store';

describe('TareasStore', () => {
  let store: TareasStore;
  /** Espías: funciones de mentira que recuerdan cómo las llamaron y devuelven lo que se les diga. */
  let api: Mocked<Pick<TareasApi, 'listar' | 'crear' | 'completar'>>;
  let avisos: Mocked<Pick<Avisos, 'mostrar'>>;

  beforeEach(() => {
    api = { listar: vi.fn(), crear: vi.fn(), completar: vi.fn() };
    avisos = { mostrar: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        { provide: TareasApi, useValue: api },
        { provide: Avisos, useValue: avisos },
      ],
    });
    store = TestBed.inject(TareasStore);
  });

  it('cargar pide la lista y la guarda', () => {
    const lista = [tarea({ hecha: true }), tarea()];
    api.listar.mockReturnValue(of(lista));

    store.cargar();

    expect(api.listar).toHaveBeenCalledTimes(1);
    expect(store.tareas()).toEqual(lista);
    expect(store.resumen()).toEqual({ total: 2, hechas: 1, pendientes: 1, porcentaje: 50 });
  });

  it('mientras carga, cargando() es true', () => {
    const respuesta = new Subject<Tarea[]>();
    api.listar.mockReturnValue(respuesta);

    store.cargar();
    expect(store.cargando()).toBe(true);

    respuesta.next([]);
    expect(store.cargando()).toBe(false);
  });

  it('si la carga falla, avisa y deja de cargar', () => {
    api.listar.mockReturnValue(throwError(() => new Error('sin red')));

    store.cargar();

    expect(avisos.mostrar).toHaveBeenCalledWith('No se han podido cargar las tareas');
    expect(store.cargando()).toBe(false);
  });

  it('crear envía el título y los minutos, añade la tarea y avisa', () => {
    api.crear.mockReturnValue(of(tarea({ id: 9, titulo: 'Nueva' })));

    store.crear('Nueva', 20);

    expect(api.crear).toHaveBeenCalledWith('Nueva', 20);
    expect(store.tareas().map((t) => t.id)).toEqual([9]);
    expect(avisos.mostrar).toHaveBeenCalledWith('Tarea creada: Nueva');
  });

  it('completar sustituye la tarea por la que devuelve la API', () => {
    api.listar.mockReturnValue(of([tarea({ id: 1 }), tarea({ id: 2 })]));
    api.completar.mockReturnValue(of(tarea({ id: 2, hecha: true })));
    store.cargar();

    store.completar(2);

    expect(api.completar).toHaveBeenCalledWith(2);
    expect(store.tareas().map((t) => t.hecha)).toEqual([false, true]);
    expect(avisos.mostrar).not.toHaveBeenCalled();
  });
});
