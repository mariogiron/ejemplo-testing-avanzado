import { Sesion } from './sesion';

describe('Sesion', () => {
  it('empieza con ana', () => {
    expect(new Sesion().usuario()).toBe('ana');
  });

  it('entrar cambia el usuario', () => {
    const sesion = new Sesion();

    sesion.entrar('ramon');

    expect(sesion.usuario()).toBe('ramon');
  });

  it('salir lo deja sin usuario', () => {
    const sesion = new Sesion();

    sesion.salir();

    expect(sesion.usuario()).toBeNull();
  });
});
