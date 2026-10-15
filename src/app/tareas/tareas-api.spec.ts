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

  // ✍️ A mano: los tests de TareasApi, mirando tareas-api.ts.
});
