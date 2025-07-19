import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';

@Injectable({
  providedIn: 'root'
})
export class LogoutUseCase {
  constructor(private authGateway: AuthGateway) {}

  execute(): Observable<boolean> {
    return this.authGateway.logout();
  }
}