import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGateway,  } from '@models/Auth/gatewey/auth.gateway';
import { AuthUser } from '@models/Auth/auth-user';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserUseCase {
  constructor(private authGateway: AuthGateway) {}

  execute(): Observable<AuthUser | null> {
    return this.authGateway.getCurrentUser();
  }
}