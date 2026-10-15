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

  // ✍️ A mano: los tests de PaginaResumen, mirando pagina-resumen.ts.
});
