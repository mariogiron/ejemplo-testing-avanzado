const { createCjsPreset } = require('jest-preset-angular/presets');

/** @type {import('jest').Config} */
module.exports = {
  // Lo que Angular necesita: jsdom como navegador y un transformador que entiende sus ficheros
  ...createCjsPreset(),
  // Solo los tests de la aplicación
  roots: ['<rootDir>/src'],
  // Antes de cada fichero de tests: preparar TestBed
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
