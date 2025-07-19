// src/app/infrastructure/drivers-adapters/auth-mock.adapter.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { AuthGateway, AuthResult } from '@models/Auth/gatewey/auth.gateway';
import { AuthUser, UserRole } from '@models/Auth/auth-user';
import { AuthCredentials } from '@models/Auth/auth-credentials';
import { StorageHelper } from '@helpers/storage/storage.helper';
import { MockDataHelper } from '@helpers/mock-data/mock-data.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService extends AuthGateway {
  private readonly STORAGE_KEY = 'leal_auth_user';
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);

  constructor() {
    super();
    this.loadSession();
  }

  authenticate(credentials: AuthCredentials): Observable<AuthResult> {
    const mockCredential = MockDataHelper.MOCK_CREDENTIALS.find(
      cred => cred.username === credentials.username && 
              cred.password === credentials.password
    );

    if (mockCredential) {
      const authUser = new AuthUser(
        mockCredential.username,
        mockCredential.role
      );

      this.saveSession(authUser);

      return of({
        success: true,
        user: authUser,
        message: 'Autenticación exitosa'
      }).pipe(delay(1000));
    }

    return of({
      success: false,
      message: 'Credenciales inválidas'
    }).pipe(delay(1000));
  }

  getCurrentUser(): Observable<AuthUser | null> {
    return this.currentUserSubject.asObservable();
  }

  logout(): Observable<boolean> {
    StorageHelper.remove(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    return of(true).pipe(delay(200));
  }

  isAuthenticated(): Observable<boolean> {
    const isAuth = this.currentUserSubject.value?.isAuthenticated ?? false;
    return of(isAuth);
  }

  private saveSession(user: AuthUser): void {
    StorageHelper.set(this.STORAGE_KEY, {
      username: user.username,
      role: user.role,
      isAuthenticated: user.isAuthenticated
    });
    this.currentUserSubject.next(user);
  }

  private loadSession(): void {
    const storedSession = StorageHelper.get<any>(this.STORAGE_KEY);
    
    if (storedSession) {
      try {
        const authUser = new AuthUser(
          storedSession.username,
          storedSession.role as UserRole,
          storedSession.isAuthenticated
        );
        this.currentUserSubject.next(authUser);
      } catch (error) {
        StorageHelper.remove(this.STORAGE_KEY);
      }
    }
  }
}