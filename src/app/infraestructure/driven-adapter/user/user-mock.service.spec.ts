import { TestBed } from '@angular/core/testing';
import { UserMockService } from './user-mock.service';
import { User } from '@models/User/user';
import { MockDataHelper } from '@helpers/mock-data/mock-data.helper';
import { StorageHelper } from '@helpers/storage/storage.helper';

describe('UserMockService', () => {
  let service: UserMockService;

  const STORAGE_KEY = 'leal_users';

  beforeEach(() => {
    // Limpia localStorage antes de cada test
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [UserMockService]
    });
    service = TestBed.inject(UserMockService);
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debe cargar usuarios por defecto si no hay datos en storage', (done) => {
    service.getAllUsers().subscribe((users: string | any[]) => {
      expect(users.length).toBe(MockDataHelper.INITIAL_USERS.length);
      done();
    });
  });

  it('debe crear un nuevo usuario', (done) => {
    const userData = {
      names: 'Juan',
      surnames: 'Pérez',
      accumulatePoints: 100,
      userActive: true
    };

    service.createUser(userData).subscribe((newUser: { id: any; names: any; }) => {
      expect(newUser.id).toBeDefined();
      expect(newUser.names).toBe('Juan');

      service.getAllUsers().subscribe((users: any[]) => {
        expect(users.find(u => u.id === newUser.id)).toBeTruthy();
        done();
      });
    });
  });

  it('debe actualizar un usuario existente', (done) => {
    service.getAllUsers().subscribe((users: any[]) => {
      const original = users[0];
      service.updateUser(original.id, {
        names: 'NombreActualizado'
      }).subscribe((updated: { names: any; }) => {
        expect(updated.names).toBe('NombreActualizado');
        done();
      });
    });
  });

  it('debe lanzar error al actualizar un usuario inexistente', (done) => {
    service.updateUser(9999, { names: 'X' }).subscribe({
      error: (err: { message: any; }) => {
        expect(err.message).toContain('Usuario no encontrado');
        done();
      }
    });
  });

  it('debe eliminar un usuario existente', (done) => {
    service.getAllUsers().subscribe((users: any[]) => {
      const user = users[0];
      service.deleteUser(user.id).subscribe((result: any) => {
        expect(result).toBeTrue();

        service.getAllUsers().subscribe((updated: any[]) => {
          expect(updated.find(u => u.id === user.id)).toBeUndefined();
          done();
        });
      });
    });
  });

  it('debe lanzar error al eliminar usuario inexistente', (done) => {
    service.deleteUser(9999).subscribe({
      error: (err: { message: any; }) => {
        expect(err.message).toContain('Usuario no encontrado');
        done();
      }
    });
  });

  it('debe contar correctamente los usuarios', (done) => {
    service.getUserCount().subscribe((count: any) => {
      expect(count).toBeGreaterThan(0);
      done();
    });
  });

  it('debe obtener solo usuarios activos', (done) => {
    service.getActiveUsers().subscribe((users: any[]) => {
      const allActive = users.every(u => u.userActive === true);
      expect(allActive).toBeTrue();
      done();
    });
  });

  it('debe obtener un usuario por ID', (done) => {
    service.getAllUsers().subscribe((users: any[]) => {
      const user = users[0];
      service.getUserById(user.id).subscribe(result => {
        expect(result?.id).toBe(user.id);
        done();
      });
    });
  });

  it('debe devolver null si el usuario por ID no existe', (done) => {
    service.getUserById(9999).subscribe((result: any) => {
      expect(result).toBeNull();
      done();
    });
  });
});
