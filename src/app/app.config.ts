import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InjectionToken } from '@angular/core';
import {provideState, provideStore} from '@ngrx/store';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import * as authEffect from './shared/store/auth-effect';
import { authFeatures } from './shared/store/auth-features';

export const API_URL = new InjectionToken<string>('API_URL');
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideEffects(authEffect),
    provideState(authFeatures),
    provideStore(),
    {
      provide: 'API_URL',
      useValue: 'https://fakestoreapi.com'
    }
  ]
};
