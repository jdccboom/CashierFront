// src/app/infrastructure/drivers-adapters/user-mock.adapter.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, throwError } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User, CreateUserData, UpdateUserData } from '@models/User/user';
import { StorageHelper } from '@helpers/storage/storage.helper';
import { MockDataHelper } from '@helpers/mock-data/mock-data.helper';

@Injectable({
  providedIn: 'root'
})
export class UserMockService extends UserGateway {
  private readonly STORAGE_KEY = 'leal_users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  
  constructor() {
    super();
    this.loadUsers();
  }

  getAllUsers(): Observable<User[]> {
    return of(this.usersSubject.value).pipe(delay(500));
  }

  getUserById(id: number): Observable<User | null> {
    const user = this.usersSubject.value.find(u => u.id === id) || null;
    return of(user).pipe(delay(300));
  }

  createUser(userData: CreateUserData): Observable<User> {
    try {
      const users = this.usersSubject.value;
      const newId = MockDataHelper.getNextUserId(users);
      
      const newUser = new User(
        newId,
        userData.names,
        userData.surnames,
        userData.accumulatePoints,
        userData.userActive
      );

      const updatedUsers = [...users, newUser];
      this.saveUsers(updatedUsers);

      return of(newUser).pipe(delay(500));
    } catch (error) {
      return throwError(() => error);
    }
  }

  updateUser(id: number, userData: UpdateUserData): Observable<User> {
    const users = this.usersSubject.value;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    try {
      const existingUser = users[userIndex];
      const updatedUser = new User(
        existingUser.id,
        userData.names ?? existingUser.names,
        userData.surnames ?? existingUser.surnames,
        userData.accumulatePoints ?? existingUser.accumulatePoints,
        userData.userActive ?? existingUser.userActive,
      );

      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
      this.saveUsers(updatedUsers);

      return of(updatedUser).pipe(delay(500));
    } catch (error) {
      return throwError(() => error);
    }
  }

  deleteUser(id: number): Observable<boolean> {
    const users = this.usersSubject.value;
    const userExists = users.some(u => u.id === id);

    if (!userExists) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    const updatedUsers = users.filter(u => u.id !== id);
    this.saveUsers(updatedUsers);

    return of(true).pipe(delay(300));
  }

  getUserCount(): Observable<number> {
    return of(this.usersSubject.value.length).pipe(delay(200));
  }

  getActiveUsers(): Observable<User[]> {
    const activeUsers = this.usersSubject.value.filter(u => u.userActive);
    return of(activeUsers).pipe(delay(300));
  }

  private loadUsers(): void {
    const storedUsers = StorageHelper.get<any[]>(this.STORAGE_KEY);
    
    if (storedUsers && storedUsers.length > 0) {
      try {
        const users = storedUsers.map(userData => 
          new User(
            userData.id,
            userData.names,
            userData.surnames,
            userData.accumulatePoints,
            userData.userActive,
          )
        );
        this.usersSubject.next(users);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        this.initializeDefaultUsers();
      }
    } else {
      this.initializeDefaultUsers();
    }
  }

  private saveUsers(users: User[]): void {
    this.usersSubject.next(users);
    StorageHelper.set(this.STORAGE_KEY, users);
  }

  private initializeDefaultUsers(): void {
    this.saveUsers(MockDataHelper.INITIAL_USERS);
  }
}