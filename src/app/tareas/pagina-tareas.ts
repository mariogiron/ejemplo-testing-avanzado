import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { filtrarPorTexto } from './resumen';
import { TareasStore } from './tareas-store';
import { TarjetaTarea } from './tarjeta-tarea';

@Component({
  selector: 'app-pagina-tareas',
  imports: [TarjetaTarea],
  template: `
    <h1>Tareas</h1>
    <p class="resumen">
      {{ store.resumen().hechas }} de {{ store.resumen().total }} hechas ({{
        store.resumen().porcentaje
      }}
      %)
    </p>

    <form (submit)="crear($event, titulo, minutos)">
      <input #titulo name="titulo" placeholder="Nueva tarea" />
      <input #minutos name="minutos" type="number" min="0" placeholder="Minutos" />
      <button type="submit">Añadir</button>
    </form>

    <p><input #filtro class="filtro" placeholder="Buscar" (input)="texto.set(filtro.value)" /></p>

    @if (store.cargando()) {
      <p>Cargando…</p>
    }
    @for (tarea of visibles(); track tarea.id) {
      <app-tarjeta-tarea [tarea]="tarea" (completar)="store.completar($event)" />
    } @empty {
      @if (!store.cargando()) {
        <p class="vacio">No hay tareas.</p>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaTareas implements OnInit {
  protected readonly store = inject(TareasStore);
  protected readonly texto = signal('');
  protected readonly visibles = computed(() => filtrarPorTexto(this.store.tareas(), this.texto()));

  ngOnInit() {
    this.store.cargar();
  }

  protected crear(evento: Event, titulo: HTMLInputElement, minutos: HTMLInputElement) {
    evento.preventDefault();
    if (titulo.value.trim()) {
      this.store.crear(titulo.value.trim(), Number(minutos.value) || 0);
      titulo.value = '';
      minutos.value = '';
    }
  }
}
