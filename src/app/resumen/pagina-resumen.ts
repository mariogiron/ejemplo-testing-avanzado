import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { resumir } from '../tareas/resumen';
import { TareasApi } from '../tareas/tareas-api';

/** Pide las tareas a la API al abrirse y enseña los números. */
@Component({
  selector: 'app-pagina-resumen',
  template: `
    <h1>Resumen</h1>
    @if (tareas.isLoading()) {
      <p class="estado">Cargando…</p>
    } @else if (tareas.error()) {
      <p class="estado error">No se ha podido cargar el resumen.</p>
    } @else if (resumen(); as resumen) {
      <dl>
        <dt>Total</dt>
        <dd class="total">{{ resumen.total }}</dd>
        <dt>Pendientes</dt>
        <dd class="pendientes">{{ resumen.pendientes }}</dd>
        <dt>Hechas</dt>
        <dd class="porcentaje">{{ resumen.porcentaje }} %</dd>
      </dl>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaResumen {
  private readonly api = inject(TareasApi);
  protected readonly tareas = rxResource({ stream: () => this.api.listar() });
  protected readonly resumen = computed(() =>
    this.tareas.hasValue() ? resumir(this.tareas.value()) : null,
  );
}
