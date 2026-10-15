import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Sesion } from './sesion';
import { usuarioInterceptor } from './usuario.interceptor';

describe('usuarioInterceptor', () => {
  /** Una sesión de mentira: solo tiene lo que el interceptor usa. */
  const usuario = signal<string | null>('ana');
  let http: HttpClient;
  let controlador: HttpTestingController;

  beforeEach(() => {
    usuario.set('ana');
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([usuarioInterceptor])),
        provideHttpClientTesting(),
        // Quien pida Sesion recibe este objeto, no la clase de verdad
        { provide: Sesion, useValue: { usuario } },
      ],
    });
    http = TestBed.inject(HttpClient);
    controlador = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controlador.verify());

  it('añade X-Usuario a las peticiones a /api/', () => {
    http.get('/api/tareas').subscribe();

    const peticion = controlador.expectOne('/api/tareas');

    expect(peticion.request.headers.get('X-Usuario')).toBe('ana');
    peticion.flush([]);
  });

  it('no la añade si no hay usuario', () => {
    usuario.set(null);

    http.get('/api/tareas').subscribe();

    const peticion = controlador.expectOne('/api/tareas');
    expect(peticion.request.headers.has('X-Usuario')).toBe(false);
    peticion.flush([]);
  });

  it('no la añade fuera de /api/', () => {
    http.get('https://ejemplo.com/datos.json').subscribe();

    const peticion = controlador.expectOne('https://ejemplo.com/datos.json');
    expect(peticion.request.headers.has('X-Usuario')).toBe(false);
    peticion.flush({});
  });
});
