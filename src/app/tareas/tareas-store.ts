import { computed, inject, Injectable, signal } from '@angular/core';
import { Avisos } from '../avisos/avisos';
import { resumir } from './resumen';
import { Tarea } from './tarea';
import { TareasApi } from './tareas-api';

/** El estado de la lista de tareas y lo que se puede hacer con ella. */
@Injectable({ providedIn: 'root' })
export class TareasStore {
  private readonly api = inject(TareasApi);
  private readonly avisos = inject(Avisos);

  private readonly _tareas = signal<Tarea[]>([]);
  private readonly _cargando = signal(false);

  readonly tareas = this._tareas.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly resumen = computed(() => resumir(this._tareas()));

  cargar() {
    this._cargando.set(true);
    this.api.listar().subscribe({
      next: (tareas) => {
        this._tareas.set(tareas);
        this._cargando.set(false);
      },
      error: () => {
        this._cargando.set(false);
        this.avisos.mostrar('No se han podido cargar las tareas');
      },
    });
  }

  crear(titulo: string, minutos: number) {
    this.api.crear(titulo, minutos).subscribe({
      next: (tarea) => {
        this._tareas.update((tareas) => [...tareas, tarea]);
        this.avisos.mostrar(`Tarea creada: ${tarea.titulo}`);
      },
      error: () => this.avisos.mostrar('No se ha podido crear la tarea'),
    });
  }

  completar(id: number) {
    this.api.completar(id).subscribe({
      next: (hecha) =>
        this._tareas.update((tareas) => tareas.map((t) => (t.id === id ? hecha : t))),
      error: () => this.avisos.mostrar('No se ha podido completar la tarea'),
    });
  }
}
