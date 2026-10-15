import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// Prepara TestBed antes de cada fichero de tests. Sin zone.js, como la aplicación.
setupZonelessTestEnv();
