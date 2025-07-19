import { TestBed } from '@angular/core/testing';
import { roleGuard } from './role.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { UserRole, Permission } from '@models/Auth/auth-user';
import { of, isObservable } from 'rxjs';
import { runInInjectionContext } from '@angular/core';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockGetCurrentUserUseCase = {
  execute: jasmine.createSpy('execute')
};

describe('roleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GetCurrentUserUseCase, useValue: mockGetCurrentUserUseCase }
      ]
    });

    mockRouter.navigate.calls.reset();
    mockGetCurrentUserUseCase.execute.calls.reset();
  });
  const mockState = { url: '/login' } as RouterStateSnapshot;


  const createMockRoute = (roles?: UserRole[], permissions?: Permission[]): ActivatedRouteSnapshot => {
    return {
      data: {
        roles,
        permissions
      }
    } as unknown as ActivatedRouteSnapshot;
  };

  it('permite acceso si el usuario está autenticado y cumple roles y permisos', (done) => {
    const user = {
      isAuthenticated: true,
      role: UserRole.ADMIN,
      hasPermission: (p: Permission) => p === Permission.VIEW_USERS
    };

    mockGetCurrentUserUseCase.execute.and.returnValue(of(user));
    const route = createMockRoute([UserRole.ADMIN], [Permission.VIEW_USERS]);

    const result = runInInjectionContext(TestBed, () =>
              roleGuard(route, mockState)
            );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeTrue();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });

  it('redirige a login si el usuario no está autenticado', (done) => {
    const user = { isAuthenticated: false };
    mockGetCurrentUserUseCase.execute.and.returnValue(of(user));
    const route = createMockRoute();

    const result = runInInjectionContext(TestBed, () =>
              roleGuard(route, mockState)
            );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });

  it('redirige si el rol del usuario no está permitido', (done) => {
    const user = {
      isAuthenticated: true,
      role: UserRole.CAJERO,
      hasPermission: () => true
    };

    mockGetCurrentUserUseCase.execute.and.returnValue(of(user));
    const route = createMockRoute([UserRole.ADMIN]);

    const result = runInInjectionContext(TestBed, () =>
              roleGuard(route, mockState)
            );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/cajero']);
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });

  it('redirige si el usuario no tiene los permisos requeridos', (done) => {
    const user = {
      isAuthenticated: true,
      role: UserRole.ADMIN,
      hasPermission: (p: Permission) => p !== Permission.EDIT_USERS
    };

    mockGetCurrentUserUseCase.execute.and.returnValue(of(user));
    const route = createMockRoute([UserRole.ADMIN], [Permission.DELETE_USERS,Permission.EDIT_USERS, Permission.CREATE_USERS, Permission.VIEW_USERS]);

    const result = runInInjectionContext(TestBed, () =>
              roleGuard(route, mockState)
            );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/admin']);
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });
});
