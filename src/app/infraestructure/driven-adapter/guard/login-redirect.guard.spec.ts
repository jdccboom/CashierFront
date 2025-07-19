import { TestBed } from '@angular/core/testing';
import { loginRedirectGuard } from './login-redirect.guard';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, isObservable } from 'rxjs';
import { runInInjectionContext } from '@angular/core';

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

const mockGetCurrentUserUseCase = {
  execute: jasmine.createSpy('execute')
};

describe('loginRedirectGuard (functional)', () => {
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
  const mockState = { url: '/login' } as RouterStateSnapshot;

  it('permite acceso si el usuario NO está autenticado', (done) => {
    const fakeUser = { isAuthenticated: false };
    mockGetCurrentUserUseCase.execute.and.returnValue(of(fakeUser));

    const result = runInInjectionContext(TestBed, () =>
          loginRedirectGuard(mockRoute, mockState)
        );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeTrue();
        expect(mockRouter.navigate).not.toHaveBeenCalled();
        done();
      });
    } else {
      fail('Expected an Observable');
    }
  });

  it('redirige si el usuario está autenticado', (done) => {
    const fakeUser = {
      isAuthenticated: true,
      getRedirectPath: () => '/dashboard'
    };
    mockGetCurrentUserUseCase.execute.and.returnValue(of(fakeUser));

    const result = runInInjectionContext(TestBed, () =>
          loginRedirectGuard(mockRoute, mockState)
        );

    if (isObservable(result)) {
      result.subscribe(value => {
        expect(value).toBeFalse();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
        done();
      });
    } else {
      fail('Expected an Observable');
    }
  });
});
