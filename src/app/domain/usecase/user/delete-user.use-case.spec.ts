import { DeleteUserUseCase } from '@usecase/user/delete-user.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { of } from 'rxjs';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let mockUserGateway: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    mockUserGateway = jasmine.createSpyObj('UserGateway', ['deleteUser']);
    useCase = new DeleteUserUseCase(mockUserGateway);
  });

  it('debería eliminar un usuario correctamente', (done) => {
    const userId = 123;
    mockUserGateway.deleteUser.and.returnValue(of(true));

    useCase.execute(userId).subscribe(result => {
      expect(result).toBeTrue();
      expect(mockUserGateway.deleteUser).toHaveBeenCalledWith(userId);
      done();
    });
  });

  it('debería retornar false si no se pudo eliminar el usuario', (done) => {
    const userId = 456;
    mockUserGateway.deleteUser.and.returnValue(of(false));

    useCase.execute(userId).subscribe(result => {
      expect(result).toBeFalse();
      expect(mockUserGateway.deleteUser).toHaveBeenCalledWith(userId);
      done();
    });
  });
});
