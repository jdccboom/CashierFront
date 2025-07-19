import { of } from 'rxjs';
import { LogoutUseCase } from '@usecase/auth/logout.use-case';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let mockAuthGateway: jasmine.SpyObj<AuthGateway>;

  beforeEach(() => {
    mockAuthGateway = jasmine.createSpyObj('AuthGateway', ['logout']);
    useCase = new LogoutUseCase(mockAuthGateway);
  });

  it('debería cerrar sesión y retornar true', (done) => {
    mockAuthGateway.logout.and.returnValue(of(true));

    useCase.execute().subscribe(result => {
      expect(result).toBeTrue();
      expect(mockAuthGateway.logout).toHaveBeenCalled();
      done();
    });
  });
});
