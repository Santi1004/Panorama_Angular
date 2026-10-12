import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// Registra el idioma español para que las fechas se muestren en español.
registerLocaleData(localeEs);

/**
 * Configuración global de la aplicación.
 * - provideRouter: sistema de rutas. Se usa "hash" (#/ruta) para que las páginas
 *   funcionen en GitHub Pages incluso al recargar el navegador.
 * - provideHttpClient: permite leer el archivo JSON con HttpClient.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es' }
  ]
};
