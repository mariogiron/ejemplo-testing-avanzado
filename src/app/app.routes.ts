import { Routes } from '@angular/router';
import { PaginaResumen } from './resumen/pagina-resumen';
import { conUsuario } from './sesion/con-usuario.guard';
import { PaginaTareas } from './tareas/pagina-tareas';

export const routes: Routes = [
  { path: '', component: PaginaTareas, title: 'Tareas' },
  {
    path: 'resumen',
    component: PaginaResumen,
    title: 'Resumen · Tareas',
    canActivate: [conUsuario],
  },
  { path: '**', redirectTo: '' },
];
