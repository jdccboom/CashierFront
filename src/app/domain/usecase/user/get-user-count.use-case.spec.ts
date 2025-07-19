import { of } from 'rxjs';
import { GetUserCountUseCase } from '@usecase/user/get-user-count.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';

describe('GetUserCountUseCase', () => {
  let useCase: GetUserCountUseCase;
  let mockUserGateway: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    mockUserGateway = jasmine.createSpyObj('UserGateway', ['getUserCount']);
    useCase = new GetUserCountUseCase(mockUserGateway);
  });

  it('debería retornar la cantidad de usuarios', (done) => {
    const mockCount = 42;
    mockUserGateway.getUserCount.and.returnValue(of(mockCount));

    useCase.execute().subscribe(result => {
      expect(result).toBe(mockCount);
      expect(mockUserGateway.getUserCount).toHaveBeenCalled();
      done();
    });
  });
});
