import { Injectable, signal } from '@angular/core';

/** Quién está usando la aplicación. Para el curso, sin contraseña. */
@Injectable({ providedIn: 'root' })
export class Sesion {
  private readonly _usuario = signal<string | null>('ana');
  readonly usuario = this._usuario.asReadonly();

  entrar(nombre: string) {
    this._usuario.set(nombre);
  }

  salir() {
    this._usuario.set(null);
  }
}
