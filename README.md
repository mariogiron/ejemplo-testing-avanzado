# Angular Avanzado · Módulo 8 · Testing desde cero

Una aplicación de **tareas** que empieza recién salida de `ng new`, completa y sin un solo test. Se le configura Jest a mano y se le ponen tests de lo más fácil a lo más difícil: funciones, un pipe, un servicio HTTP, un interceptor, componentes, un store con espías, una página con un store de mentira y el reloj de mentira. Después, la cobertura, un solo comando para Jenkins y la misma batería con Vitest.

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

`git checkout <etiqueta>` deja el código en ese paso. `main` es el final. Después de cambiar de etiqueta, `npm install`.

| Etiqueta                | Paso                                                        |
| ----------------------- | ----------------------------------------------------------- |
| `paso-0-ng-new`         | Lo que genera `ng new`                                      |
| `paso-1-partida`        | La aplicación, sin tests                                    |
| `paso-2-jest`           | Jest configurado                                            |
| `paso-3-primeros-tests` | `resumir` y `filtrarPorTexto`, datos de prueba y tipos      |
| `paso-4-pipe`           | El pipe `duracion`, con el test por delante                 |
| `paso-5-api`            | El servicio HTTP, con `HttpTestingController`               |
| `paso-6-interceptor`    | El interceptor, con una sesión de mentira                   |
| `paso-7-tarjeta`        | Un componente de presentación                               |
| `paso-8-resumen`        | Un componente que carga datos                               |
| `paso-9-store`          | Un servicio que coordina: espías                            |
| `paso-10-pagina`        | Una página que coordina: un store de mentira                |
| `paso-11-tiempo`        | El reloj de mentira                                         |
| `paso-12-cobertura`     | La cobertura, con un suelo                                  |
| `paso-13-ci`            | `test:ci`, el informe JUnit, `verificar` y el `Jenkinsfile` |

Ramas laterales, que salen de `paso-13-ci`:

| Etiqueta              | Qué es                                                                       |
| --------------------- | ---------------------------------------------------------------------------- |
| `alternativa-vitest`  | Los mismos tests con Vitest y `ng test` (instalado con `npx npm@11 install`) |
| `ejercicio-1-sesion`  | Solución del ejercicio 1                                                     |
| `ejercicio-2-errores` | Solución del ejercicio 2                                                     |
| `ejercicio-3-guard`   | Solución del ejercicio 3                                                     |
