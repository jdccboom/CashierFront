import { Observable } from 'rxjs';
import { AuthUser } from '../auth-user';
import { AuthCredentials } from '../auth-credentials';

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  message?: string;
}

export abstract class AuthGateway {
  abstract authenticate(credentials: AuthCredentials): Observable<AuthResult>;
  abstract getCurrentUser(): Observable<AuthUser | null>;
  abstract logout(): Observable<boolean>;
  abstract isAuthenticated(): Observable<boolean>;
}