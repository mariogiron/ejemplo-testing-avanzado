import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { conUsuario } from './con-usuario.guard';
import { Sesion } from './sesion';

describe('conUsuario', () => {
  const usuario = signal<string | null>('ana');

  /** Un guard funcional usa inject(): hay que ejecutarlo dentro de un contexto de inyección. */
  function ejecutar() {
    return TestBed.runInInjectionContext(() =>
      conUsuario({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: Sesion, useValue: { usuario } }] });
  });

  it('con usuario, deja pasar', () => {
    usuario.set('ana');

    expect(ejecutar()).toBe(true);
  });

  it('sin usuario, manda a la lista', () => {
    usuario.set(null);

    const resultado = ejecutar();

    expect(resultado).toBeInstanceOf(UrlTree);
    expect(String(resultado)).toBe('/');
  });
});
