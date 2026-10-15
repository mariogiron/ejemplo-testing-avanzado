import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DuracionPipe } from './duracion.pipe';
import { Tarea } from './tarea';

/** Una tarea en la lista. No sabe de dónde viene: la recibe y avisa si la completan. */
@Component({
  selector: 'app-tarjeta-tarea',
  imports: [DuracionPipe],
  template: `
    <article class="tarjeta" [class.hecha]="tarea().hecha">
      <span class="titulo">{{ tarea().titulo }}</span>
      <span class="duracion">{{ tarea().minutos | duracion }}</span>
      @if (!tarea().hecha) {
        <button (click)="completar.emit(tarea().id)">Hecha</button>
      }
    </article>
  `,
  styles: `
    .tarjeta {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 8px 12px;
      margin: 6px 0;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      max-width: 520px;
    }
    .titulo {
      flex: 1;
    }
    .hecha .titulo {
      text-decoration: line-through;
      color: #6b7280;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaTarea {
  readonly tarea = input.required<Tarea>();
  readonly completar = output<number>();
}
