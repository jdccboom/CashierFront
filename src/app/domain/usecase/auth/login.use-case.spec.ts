import { of } from 'rxjs';
import { LoginUseCase } from '@usecase/auth/login.use-case';
import { AuthGateway, AuthResult } from '@models/Auth/gatewey/auth.gateway';
import { AuthCredentials } from '@models/Auth/auth-credentials';
import { AuthUser, UserRole } from '@models/Auth/auth-user'; // Asegúrate de tener esta clase o interfaz

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockAuthGateway: jasmine.SpyObj<AuthGateway>;

  beforeEach(() => {
    mockAuthGateway = jasmine.createSpyObj('AuthGateway', ['authenticate']);
    useCase = new LoginUseCase(mockAuthGateway);
  });

  it('debería autenticar con credenciales válidas', (done) => {
    const username = 'usuario';
    const password = 'clave123';

    const expectedUser = new AuthUser ('usuario', UserRole.ADMIN, true);

    const expectedResult: AuthResult = {
      success: true,
      user: expectedUser,
      message: 'Autenticación exitosa'
    };

    mockAuthGateway.authenticate.and.returnValue(of(expectedResult));

    useCase.execute(username, password).subscribe(result => {
      expect(result).toEqual(expectedResult);
      expect(mockAuthGateway.authenticate).toHaveBeenCalledWith(
        new AuthCredentials(username, password)
      );
      done();
    });
  });
});
