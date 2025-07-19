import { CreateUserUseCase } from '@usecase/user/create-user.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { CreateUserData, User } from '@models/User/user';
import { of } from 'rxjs';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserGateway: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    mockUserGateway = jasmine.createSpyObj('UserGateway', ['createUser']);
    useCase = new CreateUserUseCase(mockUserGateway);
  });

  it('debería crear un usuario con datos válidos', (done) => {
    const mockUserData: CreateUserData = {
      names: 'Juan',
      surnames: 'Pérez',
      accumulatePoints: 10,
      userActive: true
    };

    const expectedUser = new User(
      1,
      mockUserData.names,
      mockUserData.surnames,
      mockUserData.accumulatePoints,
      mockUserData.userActive
    );

    mockUserGateway.createUser.and.returnValue(of(expectedUser));

    useCase.execute(mockUserData).subscribe((result: any) => {
      expect(result).toEqual(expectedUser);
      expect(mockUserGateway.createUser).toHaveBeenCalledWith(mockUserData);
      done();
    });
  });

  it('debería lanzar un error si los puntos son negativos', () => {
    const invalidUserData: CreateUserData = {
      names: 'Pedro',
      surnames: 'Gómez',
      accumulatePoints: -5,
      userActive: true
    };

    expect(() => useCase.execute(invalidUserData)).toThrowError('Los puntos no pueden ser negativos');
    expect(mockUserGateway.createUser).not.toHaveBeenCalled();
  });
});
