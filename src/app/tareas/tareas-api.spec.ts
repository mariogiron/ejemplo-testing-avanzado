import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tarea } from '../../testing/datos';
import { Tarea } from './tarea';
import { TareasApi } from './tareas-api';

describe('TareasApi', () => {
  let api: TareasApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClient de verdad, pero sin red: las peticiones se quedan esperando al test
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(TareasApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ninguna petición sin contestar ni sin esperar
    http.verify();
  });

  it('pide la lista con GET /api/tareas', () => {
    const lista = [tarea({ titulo: 'Una' }), tarea({ titulo: 'Otra' })];
    let recibidas: Tarea[] | undefined;

    api.listar().subscribe((tareas) => (recibidas = tareas));
    const peticion = http.expectOne('/api/tareas');
    peticion.flush(lista);

    expect(peticion.request.method).toBe('GET');
    expect(recibidas).toEqual(lista);
  });

  it('crea con POST y envía el título y los minutos', () => {
    api.crear('Nueva', 25).subscribe();

    const peticion = http.expectOne('/api/tareas');

    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual({ titulo: 'Nueva', minutos: 25 });
    peticion.flush(tarea({ titulo: 'Nueva', minutos: 25 }));
  });

  it('completa con PATCH /api/tareas/:id', () => {
    api.completar(7).subscribe();

    const peticion = http.expectOne({ method: 'PATCH', url: '/api/tareas/7' });

    expect(peticion.request.body).toEqual({ hecha: true });
    peticion.flush(tarea({ id: 7, hecha: true }));
  });

  it('si la API falla, el error llega a quien se suscribe', () => {
    let estado: number | undefined;

    api.listar().subscribe({ error: (error) => (estado = error.status) });
    http.expectOne('/api/tareas').flush('Fallo', { status: 500, statusText: 'Server Error' });

    expect(estado).toBe(500);
  });
});
