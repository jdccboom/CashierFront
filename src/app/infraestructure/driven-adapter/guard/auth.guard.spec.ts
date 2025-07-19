import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of, isObservable } from 'rxjs';
import { runInInjectionContext } from '@angular/core';

// Mocks
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockGetCurrentUserUseCase = {
  execute: jasmine.createSpy('execute')
};

describe('authGuard (functional)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GetCurrentUserUseCase, useValue: mockGetCurrentUserUseCase },
        { provide: Router, useValue: mockRouter }
      ]
    });

    mockRouter.navigate.calls.reset();
    mockGetCurrentUserUseCase.execute.calls.reset();
  });

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = { url: '/protected' } as RouterStateSnapshot;

  it('permite acceso si el usuario está autenticado', (done) => {
    const fakeUser = { isAuthenticated: true };
    mockGetCurrentUserUseCase.execute.and.returnValue(of(fakeUser));

    const result = runInInjectionContext(TestBed, () =>
      authGuard(mockRoute, mockState)
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

  it('redirige al login si el usuario NO está autenticado', (done) => {
    const fakeUser = { isAuthenticated: false };
    mockGetCurrentUserUseCase.execute.and.returnValue(of(fakeUser));

    const result = runInInjectionContext(TestBed, () =>
      authGuard(mockRoute, mockState)
    );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
          queryParams: { returnUrl: '/protected' }
        });
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });

  it('redirige si no hay usuario (null)', (done) => {
    mockGetCurrentUserUseCase.execute.and.returnValue(of(null));

    const result = runInInjectionContext(TestBed, () =>
      authGuard(mockRoute, mockState)
    );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {
          queryParams: { returnUrl: '/protected' }
        });
        done();
      });
    } else {
      fail('Expected Observable');
    }
  });
});
