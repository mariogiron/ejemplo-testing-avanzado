import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { tarea } from '../../testing/datos';
import { Tarea } from '../tareas/tarea';
import { TareasApi } from '../tareas/tareas-api';
import { PaginaResumen } from './pagina-resumen';

describe('PaginaResumen', () => {
  /** La respuesta de la API llega cuando el test lo decide. */
  let respuesta: Subject<Tarea[]>;

  function abrir() {
    respuesta = new Subject<Tarea[]>();
    TestBed.configureTestingModule({
      providers: [{ provide: TareasApi, useValue: { listar: () => respuesta } }],
    });
    const fixture = TestBed.createComponent(PaginaResumen);
    // Aquí no vale whenStable: espera a que el recurso termine, y la respuesta todavía no ha llegado
    fixture.detectChanges();
    return fixture;
  }

  const texto = (html: HTMLElement, selector: string) =>
    html.querySelector(selector)?.textContent?.trim();

  it('mientras espera, dice que está cargando', () => {
    const fixture = abrir();

    expect(texto(fixture.nativeElement, '.estado')).toBe('Cargando…');
  });

  it('cuando llegan las tareas, enseña los números', async () => {
    const fixture = abrir();

    respuesta.next([tarea({ hecha: true }), tarea(), tarea(), tarea()]);
    respuesta.complete();
    await fixture.whenStable();

    expect(texto(fixture.nativeElement, '.total')).toBe('4');
    expect(texto(fixture.nativeElement, '.pendientes')).toBe('3');
    expect(texto(fixture.nativeElement, '.porcentaje')).toBe('25 %');
  });

  it('si la API falla, lo dice', async () => {
    const fixture = abrir();

    respuesta.error(new Error('sin red'));
    await fixture.whenStable();

    expect(texto(fixture.nativeElement, '.estado')).toBe('No se ha podido cargar el resumen.');
  });
});
