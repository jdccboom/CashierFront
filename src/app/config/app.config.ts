import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { UserMockService } from '@driven-adapter/user/user-mock.service';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';
import { AuthMockService } from '@driven-adapter/auth/auth-mock.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()),
  { provide: UserGateway, useClass: UserMockService },
  { provide: AuthGateway, useClass: AuthMockService }]
};
