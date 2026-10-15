import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tarea } from '../../testing/datos';
import { PaginaTareas } from './pagina-tareas';
import { resumir } from './resumen';
import { Tarea } from './tarea';
import { TareasStore } from './tareas-store';

/** Un store de mentira: signals que el test controla y métodos que solo recuerdan las llamadas. */
function crearStoreFalso() {
  const tareas = signal<Tarea[]>([]);
  return {
    tareas,
    cargando: signal(false),
    resumen: computed(() => resumir(tareas())),
    cargar: jest.fn(),
    crear: jest.fn(),
    completar: jest.fn(),
  };
}

describe('PaginaTareas', () => {
  let store: ReturnType<typeof crearStoreFalso>;
  let fixture: ComponentFixture<PaginaTareas>;
  let html: HTMLElement;

  beforeEach(async () => {
    store = crearStoreFalso();
    store.tareas.set([
      tarea({ id: 1, titulo: 'Configurar Jenkins', hecha: true }),
      tarea({ id: 2, titulo: 'Revisar los ejercicios' }),
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: TareasStore, useValue: store }],
    });
    fixture = TestBed.createComponent(PaginaTareas);
    await fixture.whenStable();
    html = fixture.nativeElement;
  });

  const titulos = () =>
    [...html.querySelectorAll('app-tarjeta-tarea .titulo')].map((e) => e.textContent);

  // ✍️ A mano: los tests de PaginaTareas, mirando pagina-tareas.ts.
});
