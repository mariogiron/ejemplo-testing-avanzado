import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Sesion } from './sesion';

/** Sin usuario no se entra: vuelta a la lista. */
export const conUsuario: CanActivateFn = () =>
  inject(Sesion).usuario() !== null || inject(Router).parseUrl('/');
