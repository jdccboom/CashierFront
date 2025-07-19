import { TestBed } from '@angular/core/testing';
import { AuthMockService } from './auth-mock.service';
import { AuthCredentials } from '@models/Auth/auth-credentials';
import { UserRole } from '@models/Auth/auth-user';
import { StorageHelper } from '@helpers/storage/storage.helper';
import { MockDataHelper } from '@helpers/mock-data/mock-data.helper';

describe('AuthMockService', () => {
  let service: AuthMockService;

  const STORAGE_KEY = 'leal_auth_user';

  beforeEach(() => {
    spyOn(StorageHelper, 'get').and.returnValue(null);
    spyOn(StorageHelper, 'set').and.callThrough();
    spyOn(StorageHelper, 'remove').and.callThrough();

    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMockService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe autenticarse con credenciales válidas', (done) => {
    const validCreds = MockDataHelper.MOCK_CREDENTIALS[0];

    const credentials = new AuthCredentials(validCreds.username, validCreds.password);

    service.authenticate(credentials).subscribe(result => {
      expect(result.success).toBeTrue();
      expect(result.user).toBeTruthy();
      expect(result.user?.username).toEqual(validCreds.username);
      done();
    });
  });

  it('debe fallar la autenticación con credenciales inválidas', (done) => {
    const credentials = new AuthCredentials('usuario', 'contraseña');

    service.authenticate(credentials).subscribe(result => {
      expect(result.success).toBeFalse();
      expect(result.message).toContain('inválidas');
      done();
    });
  });

  it('debe emitir usuario actual después de la autenticación', (done) => {
    const validCreds = MockDataHelper.MOCK_CREDENTIALS[0];

    const credentials = new AuthCredentials(validCreds.username, validCreds.password);

    service.authenticate(credentials).subscribe(() => {
      service.getCurrentUser().subscribe(user => {
        expect(user?.username).toBe(validCreds.username);
        expect(user?.role).toBe(validCreds.role);
        done();
      });
    });
  });

  it('debe desconectarse y borrar la sesión', (done) => {
    service.logout().subscribe(result => {
      expect(result).toBeTrue();
      service.getCurrentUser().subscribe(user => {
        expect(user).toBeNull();
        expect(StorageHelper.remove).toHaveBeenCalledWith(STORAGE_KEY);
        done();
      });
    });
  });

  it('debe devolver true para isAuthenticated si la sesión está presente', (done) => {
    const validCreds = MockDataHelper.MOCK_CREDENTIALS[0];

    const credentials = new AuthCredentials(validCreds.username, validCreds.password);

    service.authenticate(credentials).subscribe(() => {
      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBeTrue();
        done();
      });
    });
  });

  it('debe devolver false para isAuthenticated si no hay usuario', (done) => {
    service.logout().subscribe(() => {
      service.isAuthenticated().subscribe(isAuth => {
        expect(isAuth).toBeFalse();
        done();
      });
    });
  });

  it('debe cargar la sesión desde StorageHelper en init', () => {
    const mockUser = {
      username: 'testuser',
      role: 'admin' as UserRole,
      isAuthenticated: true
    };
    (StorageHelper.get as jasmine.Spy).and.returnValue(mockUser);

    const newService = new AuthMockService();

    newService.getCurrentUser().subscribe(user => {
      expect(user?.username).toBe('testuser');
      expect(user?.role).toBe(UserRole.ADMIN);
    });
  });

  it('debe manejar los datos de sesión corruptos y borrarlos', () => {
    (StorageHelper.get as jasmine.Spy).and.returnValue({ invalid: 'data' });

    const newService = new AuthMockService();

    newService.getCurrentUser().subscribe(user => {
      expect(user).toBeNull();
      expect(StorageHelper.remove).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
