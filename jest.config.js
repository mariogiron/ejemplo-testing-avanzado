const { createCjsPreset } = require('jest-preset-angular/presets');

/** @type {import('jest').Config} */
module.exports = {
  // Lo que Angular necesita: jsdom como navegador y un transformador que entiende sus ficheros
  ...createCjsPreset(),
  // Solo los tests de la aplicación
  roots: ['<rootDir>/src'],
  // Antes de cada fichero de tests: preparar TestBed
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // Antes de cada test, los espías olvidan las llamadas del test anterior
  clearMocks: true,
  // Y los espías puestos con jest.spyOn se retiran: vuelve la función original
  restoreMocks: true,
  // La cobertura mide todo el código de la aplicación, también lo que ningún test importa
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    // Solo funciona en un navegador de verdad: en los tests se sustituye con jest.mock
    '!src/app/compartido/descargar.ts',
  ],
  coverageReporters: ['text', 'html'],
  // El suelo: si baja de aquí, jest --coverage termina con error
  coverageThreshold: {
    global: { lines: 80 },
  },
};
