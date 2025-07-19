import { Observable } from 'rxjs';
import { User, CreateUserData, UpdateUserData } from '../user';

export abstract class UserGateway {
  abstract getAllUsers(): Observable<User[]>;
  abstract getUserById(id: number): Observable<User | null>;
  abstract createUser(userData: CreateUserData): Observable<User>;
  abstract updateUser(id: number, userData: UpdateUserData): Observable<User>;
  abstract deleteUser(id: number): Observable<boolean>;
  abstract getUserCount(): Observable<number>;
  abstract getActiveUsers(): Observable<User[]>;
}