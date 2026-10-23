import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tarea } from '../../testing/datos';
import { descargar } from '../compartido/descargar';
import { PaginaTareas } from './pagina-tareas';
import { resumir } from './resumen';
import { Tarea } from './tarea';
import { TareasStore } from './tareas-store';

// jsdom no sabe descargar ficheros: el módulo entero se sustituye por funciones espía
jest.mock('../compartido/descargar');

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
    TestBed.configureTestingModule({ providers: [{ provide: TareasStore, useValue: store }] });
    fixture = TestBed.createComponent(PaginaTareas);
    await fixture.whenStable();
    html = fixture.nativeElement;
  });

  const titulos = () =>
    [...html.querySelectorAll('app-tarjeta-tarea .titulo')].map((e) => e.textContent);

  it('al abrirse pide las tareas', () => {
    expect(store.cargar).toHaveBeenCalledTimes(1);
  });

  it('enseña una tarjeta por tarea y el resumen', () => {
    expect(titulos()).toEqual(['Configurar Jenkins', 'Revisar los ejercicios']);
    expect(html.querySelector('.resumen')?.textContent).toContain('1 de 2 hechas (50 %)');
  });

  it('filtra por el texto de búsqueda', async () => {
    const filtro = html.querySelector<HTMLInputElement>('.filtro')!;

    filtro.value = 'jenkins';
    filtro.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(titulos()).toEqual(['Configurar Jenkins']);
  });

  it('el formulario crea la tarea con el título y los minutos', () => {
    html.querySelector<HTMLInputElement>('input[name=titulo]')!.value = '  Escribir el informe ';
    html.querySelector<HTMLInputElement>('input[name=minutos]')!.value = '60';

    html.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.crear).toHaveBeenCalledWith('Escribir el informe', 60);
  });

  it('sin título no crea nada', () => {
    html.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.crear).not.toHaveBeenCalled();
  });

  it('el botón Hecha de una tarjeta llega al store', () => {
    html.querySelector<HTMLButtonElement>('app-tarjeta-tarea button')!.click();

    expect(store.completar).toHaveBeenCalledWith(2);
  });

  it('cuando cambian las tareas del store, la página se actualiza', async () => {
    store.tareas.set([]);
    await fixture.whenStable();

    expect(html.querySelector('.vacio')?.textContent).toBe('No hay tareas.');
  });

  describe('exportar', () => {
    const exportar = () => html.querySelector<HTMLButtonElement>('.exportar')!.click();

    it('si el usuario confirma, descarga en CSV las tareas que se ven', () => {
      const confirmar = jest.spyOn(window, 'confirm').mockReturnValue(true);

      exportar();

      expect(confirmar).toHaveBeenCalledWith('¿Descargar 2 tareas?');
      expect(descargar).toHaveBeenCalledWith(
        'titulo;minutos;hecha\nConfigurar Jenkins;30;sí\nRevisar los ejercicios;30;no',
        'tareas.csv',
        'text/csv',
      );
    });

    it('si el usuario cancela, no descarga nada', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false);

      exportar();

      expect(descargar).not.toHaveBeenCalled();
    });
  });
});
