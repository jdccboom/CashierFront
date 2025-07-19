export class AuthUser {
  constructor(
    public readonly username: string,
    public readonly role: UserRole,
    public readonly isAuthenticated: boolean = true
  ) {
    this.validateAuthUser();
  }

  private validateAuthUser(): void {
    if (!this.username?.trim()) {
      throw new Error('El nombre de usuario es requerido');
    }
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  public isCajero(): boolean {
    return this.role === UserRole.CAJERO;
  }

  public hasPermission(permission: Permission): boolean {
    return this.role === UserRole.ADMIN || 
           (this.role === UserRole.CAJERO && permission === Permission.VIEW_USERS);
  }

  public getRedirectPath(): string {
    return this.isAdmin() ? '/dashboard/admin' : '/dashboard/cajero';
  }
}

export enum UserRole {
  ADMIN = 'admin',
  CAJERO = 'cajero'
}

export enum Permission {
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users'
}