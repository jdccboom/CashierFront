import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGateway, AuthResult } from '@models/Auth/gatewey/auth.gateway';
import { AuthCredentials } from '@models/Auth/auth-credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  constructor(private authGateway: AuthGateway) {}

  execute(username: string, password: string): Observable<AuthResult> {
    const credentials = new AuthCredentials(username, password);
    return this.authGateway.authenticate(credentials);
  }
}