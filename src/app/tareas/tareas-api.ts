import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from './tarea';

/** Habla con la API de tareas. No guarda nada: cada método es una petición. */
@Injectable({ providedIn: 'root' })
export class TareasApi {
  private readonly http = inject(HttpClient);

  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>('/api/tareas');
  }

  crear(titulo: string, minutos: number): Observable<Tarea> {
    return this.http.post<Tarea>('/api/tareas', { titulo, minutos });
  }

  completar(id: number): Observable<Tarea> {
    return this.http.patch<Tarea>(`/api/tareas/${id}`, { hecha: true });
  }
}
