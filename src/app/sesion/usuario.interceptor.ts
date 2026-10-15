import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Sesion } from './sesion';

/** Dice a la API quién hace cada petición, con la cabecera X-Usuario. Solo hacia /api/. */
export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
  const usuario = inject(Sesion).usuario();
  if (!req.url.startsWith('/api/') || !usuario) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { 'X-Usuario': usuario } }));
};
