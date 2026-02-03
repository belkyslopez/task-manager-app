import { bootstrapApplication } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import {
  close,
  closeOutline,
  closeSharp,
  chevronForwardSharp,
  chevronForward,
  chevronForwardOutline,
  documentText,
  documentTextOutline,
  documentTextSharp,
  addSharp,
  addOutline,
  add,
  chevronBackSharp,
  chevronBack,
  chevronBackOutline,
  invertModeSharp,
  invertModeOutline,
  invertMode,
  sunnyOutline,
  sunnySharp,
  sunny,
  moon,
  moonOutline,
  moonSharp,
} from 'ionicons/icons';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

addIcons({
  // Close
  close,
  'close-outline': closeOutline,
  'close-sharp': closeSharp,

  // Chevron
  'chevron-forward-sharp': chevronForwardSharp,
  'chevron-forward': chevronForward,
  'chevron-forward-outline': chevronForwardOutline,

  // Chevron-back
  'chevron-back-sharp': chevronBackSharp,
  'chevron-back': chevronBack,
  'chevron-back-outline': chevronBackOutline,

  // Document text
  'document-text': documentText,
  'document-text-outline': documentTextOutline,
  'document-text-sharp': documentTextSharp,

  // Add
  add,
  'add-sharp': addSharp,
  'add-outline': addOutline,

    // invert-mode
  'invert-mode': invertMode,
  'invert-mode-sharp': invertModeSharp,
  'invert-mode-outline': invertModeOutline,

  //sunny
  sunny,
  'sunny-outline': sunnyOutline,
  'sunny-sharp': sunnySharp,

  //moon
  moon,
  'moon-outline': moonOutline,
  'moon-sharp': moonSharp
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});
