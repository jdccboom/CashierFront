import { of } from 'rxjs';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';
import { AuthUser, Permission, UserRole } from '@models/Auth/auth-user';

describe('GetCurrentUserUseCase', () => {
  let useCase: GetCurrentUserUseCase;
  let mockAuthGateway: jasmine.SpyObj<AuthGateway>;

  beforeEach(() => {
    mockAuthGateway = jasmine.createSpyObj('AuthGateway', ['getCurrentUser']);
    useCase = new GetCurrentUserUseCase(mockAuthGateway);
  });

  it('debería retornar el usuario autenticado si existe', (done) => {
    const mockUser= new AuthUser('test', UserRole.ADMIN, true);
    mockAuthGateway.getCurrentUser.and.returnValue(of(mockUser));

    useCase.execute().subscribe(result => {
      expect(result).toEqual(mockUser);
      expect(mockAuthGateway.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });

  it('debería retornar null si no hay usuario autenticado', (done) => {
    mockAuthGateway.getCurrentUser.and.returnValue(of(null));

    useCase.execute().subscribe(result => {
      expect(result).toBeNull();
      expect(mockAuthGateway.getCurrentUser).toHaveBeenCalled();
      done();
    });
  });
});
