import { User } from '@models/User/user';
import { AuthUser, UserRole } from '@models/Auth/auth-user';

export class MockDataHelper {
  static readonly INITIAL_USERS: User[] = [
    new User(1, 'Juan Carlos', 'Pérez García', 1250, true),
    new User(2, 'María Elena', 'Rodríguez López', 850, true),
    new User(3, 'Carlos Alberto', 'Martínez Silva', 2100, false),
    new User(4, 'Ana Sofía', 'González Vargas', 675, true),
    new User(5, 'Luis Fernando', 'Hernández Castro', 1800, true),
    new User(6, 'Juan Carlos', 'Pérez García', 1250, true),
    new User(7, 'María Elena', 'Rodríguez López', 850, true),
    new User(8, 'Carlos Alberto', 'Martínez Silva', 2100, false),
    new User(9, 'Ana Sofía', 'González Vargas', 675, true),
    new User(10, 'Luis Fernando', 'Hernández Castro', 1800, true)
  ];

  static readonly MOCK_CREDENTIALS = [
    { username: 'Admin', password: 'LealAdmin', role: UserRole.ADMIN },
    { username: 'Cajero', password: 'LealCajero', role: UserRole.CAJERO }
  ];

  static getNextUserId(existingUsers: User[]): number {
    return existingUsers.length > 0 
      ? Math.max(...existingUsers.map(u => u.id)) + 1 
      : 1;
  }
}