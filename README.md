# Angular Avanzado · Módulo 8 · Testing

Una aplicación de **tareas** que empieza recién salida de `ng new`, completa y sin un solo test. Se le configura Jest a mano y se le ponen tests de lo más fácil a lo más difícil: funciones, un pipe, un servicio HTTP, un interceptor, componentes, un store con espías, una página con un store de mentira y el reloj de mentira. Después, la cobertura, un solo comando para Jenkins y los mismos tests con Vitest.

## Antes de empezar

Hace falta Node.js 22 (vale la 20.19 o posterior, la 22.13 o posterior, o la 24).

```
git clone <dirección del repositorio>
cd tareas
npm ci
npx ng analytics disable --global
npm test
```

`npm test` tiene que terminar con `Tests: 48 passed, 48 total`.

## Órdenes

```
node servidores/api.mjs   # la API de prácticas, en http://localhost:3000
npm start                 # la aplicación, en http://localhost:4200

npm test                  # Jest
npm run test:watch        # Jest vigilando los cambios
npm run test:tipos        # comprueba los tipos de los tests (Jest no lo hace)
npm run test:ci           # cobertura con suelo e informe JUnit en informes/junit.xml
npm run verificar         # formato, tipos, tests y build: lo que hace Jenkins
```

## Etiquetas

`git checkout -f <etiqueta>` deja el código en ese paso y descarta lo que se haya tocado para probar. `main` es el final, con este README. Todas las etiquetas usan las mismas dependencias que `main`: no hace falta volver a instalar nada al cambiar de una a otra, salvo con `alternativa-vitest` (abajo).

De los pasos 3 al 11 hay dos etiquetas. `paso-N-a-mano` tiene el código que se prueba y todo lo que no es un test, ya preparado: la configuración, los datos de prueba, los imports, el `describe`, el `beforeEach`, los dobles y las funciones de ayuda. El `describe` está vacío, con un comentario `✍️ A mano`: los tests se escriben mirando el código que se prueba. Hasta que haya uno, Jest dice `Your test suite must contain at least one test` para ese fichero. En el paso 4, además de los tests, se escribe el pipe: la etiqueta trae una copia que se limita a añadir « min» a los minutos, y el rojo-verde lo hace quien escribe. La etiqueta siguiente, la del paso completo, es la solución; `git checkout -f` descarta lo que se haya escrito.

| Etiqueta                | Paso                                                          |
| ----------------------- | ------------------------------------------------------------- |
| `paso-0-ng-new`         | Lo que genera `ng new`                                        |
| `paso-1-partida`        | La aplicación, sin tests                                      |
| `paso-2-jest`           | Jest configurado (todavía sin tests: `npm test` falla)        |
| `paso-3-a-mano`         | A mano: los tests de `resumir` y `filtrarPorTexto`            |
| `paso-3-primeros-tests` | `resumir` y `filtrarPorTexto`, datos de prueba y tipos        |
| `paso-4-a-mano`         | A mano: los tests del pipe y el pipe, con el test por delante |
| `paso-4-pipe`           | El pipe `duracion`, con el test por delante                   |
| `paso-5-a-mano`         | A mano: los tests del servicio HTTP                           |
| `paso-5-api`            | El servicio HTTP, con `HttpTestingController`                 |
| `paso-6-a-mano`         | A mano: los tests del interceptor                             |
| `paso-6-interceptor`    | El interceptor, con una sesión de mentira                     |
| `paso-7-a-mano`         | A mano: los tests de la tarjeta                               |
| `paso-7-tarjeta`        | Un componente de presentación                                 |
| `paso-8-a-mano`         | A mano: los tests de la página de resumen                     |
| `paso-8-resumen`        | Un componente que carga datos                                 |
| `paso-9-a-mano`         | A mano: los tests del store, con espías                       |
| `paso-9-store`          | Un servicio que coordina: espías                              |
| `paso-10-a-mano`        | A mano: los tests de la página de tareas                      |
| `paso-10-pagina`        | Una página que coordina: un store de mentira                  |
| `paso-11-a-mano`        | A mano: los tests de los avisos                               |
| `paso-11-tiempo`        | El reloj de mentira                                           |
| `paso-12-cobertura`     | La cobertura, con un suelo                                    |
| `paso-13-ci`            | `test:ci`, el informe JUnit, `verificar` y el `Jenkinsfile`   |

Ramas laterales, que salen de `paso-13-ci`:

| Etiqueta              | Qué es                                                                   |
| --------------------- | ------------------------------------------------------------------------ |
| `ejercicio-1-sesion`  | Solución del ejercicio 1                                                 |
| `ejercicio-2-errores` | Solución del ejercicio 2                                                 |
| `ejercicio-3-guard`   | Solución del ejercicio 3                                                 |
| `ampliar-espias`      | Exportar a CSV: `jest.spyOn`, `jest.mock`, `clearMocks` y `restoreMocks` |
| `alternativa-vitest`  | Los mismos tests con Vitest y `ng test`. Al entrar y al salir, `npm ci`  |
