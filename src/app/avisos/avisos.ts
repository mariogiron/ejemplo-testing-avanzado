import { Injectable, signal } from '@angular/core';

/** Cuánto se ve un aviso, en milisegundos. */
export const DURACION_AVISO = 3000;

/** Un aviso en la parte de arriba de la aplicación, que se quita solo. */
@Injectable({ providedIn: 'root' })
export class Avisos {
  private readonly _mensaje = signal<string | null>(null);
  readonly mensaje = this._mensaje.asReadonly();
  private temporizador?: ReturnType<typeof setTimeout>;

  mostrar(texto: string) {
    clearTimeout(this.temporizador);
    this._mensaje.set(texto);
    this.temporizador = setTimeout(() => this._mensaje.set(null), DURACION_AVISO);
  }
}
