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

  it('enseña el título y la duración', async () => {
    await pintar();

    expect(html.querySelector('.titulo')?.textContent).toBe('Configurar Jenkins');
    expect(html.querySelector('.duracion')?.textContent).toBe('1 h 30 min');
  });

  it('una tarea pendiente tiene el botón Hecha', async () => {
    await pintar();

    expect(html.querySelector('button')?.textContent).toContain('Hecha');
    expect(html.querySelector('.tarjeta')?.classList).not.toContain('hecha');
  });

  it('una tarea hecha se tacha y no tiene botón', async () => {
    await pintar({ hecha: true });

    expect(html.querySelector('.tarjeta')?.classList).toContain('hecha');
    expect(html.querySelector('button')).toBeNull();
  });

  it('al pulsar Hecha avisa con el id de la tarea', async () => {
    await pintar();
    const avisos: number[] = [];
    fixture.componentInstance.completar.subscribe((id) => avisos.push(id));

    html.querySelector('button')!.click();

    expect(avisos).toEqual([3]);
  });
});
