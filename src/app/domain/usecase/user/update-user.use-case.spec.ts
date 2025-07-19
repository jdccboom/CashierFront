import { of } from 'rxjs';
import { UpdateUserUseCase } from '@usecase/user/update-user.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User, UpdateUserData } from '@models/User/user';

describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let mockUserGateway: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    mockUserGateway = jasmine.createSpyObj('UserGateway', ['updateUser']);
    useCase = new UpdateUserUseCase(mockUserGateway);
  });

  it('debería actualizar un usuario correctamente', (done) => {
    const userId = 1;
    const updateData: UpdateUserData = {
      names: 'Carlos',
      accumulatePoints: 50
    };

    const updatedUser = new User(userId,'Carlos', 'Ramírez',50, true);

    mockUserGateway.updateUser.and.returnValue(of(updatedUser));

    useCase.execute(userId, updateData).subscribe(result => {
      expect(result).toEqual(updatedUser);
      expect(mockUserGateway.updateUser).toHaveBeenCalledWith(userId, updateData);
      done();
    });
  });

  it('debería lanzar un error si los puntos son negativos', () => {
    const userId = 1;
    const invalidData: UpdateUserData = {
      names: 'Laura',
      accumulatePoints: -10
    };

    expect(() => useCase.execute(userId, invalidData))
      .toThrowError('Los puntos no pueden ser negativos');
  });
});
