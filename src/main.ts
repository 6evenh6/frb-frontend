/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideNgxMask } from 'ngx-mask';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNgxMask() // <- Adiciona aqui
  ]
})
.catch((err) => console.error(err));