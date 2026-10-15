import { ComponentFixture, TestBed } from '@angular/core/testing';
import { tarea } from '../../testing/datos';
import { TarjetaTarea } from './tarjeta-tarea';

describe('TarjetaTarea', () => {
  let fixture: ComponentFixture<TarjetaTarea>;
  let html: HTMLElement;

  /** Crea la tarjeta con una tarea y espera a que se pinte. */
  async function pintar(cambios: Parameters<typeof tarea>[0] = {}) {
    fixture = TestBed.createComponent(TarjetaTarea);
    fixture.componentRef.setInput(
      'tarea',
      tarea({ id: 3, titulo: 'Configurar Jenkins', minutos: 90, ...cambios }),
    );
    await fixture.whenStable();
    html = fixture.nativeElement;
  }

  // ✍️ A mano: los tests de TarjetaTarea, mirando tarjeta-tarea.ts.
});
