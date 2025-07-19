import { of } from 'rxjs';
import { GetUsersUseCase } from '@usecase/user/get-users.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User } from '@models/User/user';

describe('GetUsersUseCase', () => {
  let useCase: GetUsersUseCase;
  let mockUserGateway: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    mockUserGateway = jasmine.createSpyObj('UserGateway', ['getAllUsers']);
    useCase = new GetUsersUseCase(mockUserGateway);
  });

  it('debería retornar una lista de usuarios', (done) => {
    const mockUsers: User[] = [
      new User( 1, 'Juan', 'Pérez', 100, true ),
      new User( 2, 'Ana', 'López', 200, false )
    ];

    mockUserGateway.getAllUsers.and.returnValue(of(mockUsers));

    useCase.execute().subscribe(result => {
      expect(result).toEqual(mockUsers);
      expect(mockUserGateway.getAllUsers).toHaveBeenCalled();
      done();
    });
  });
});
