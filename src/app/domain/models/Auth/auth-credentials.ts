export class AuthCredentials {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {
    this.validateCredentials();
  }

  private validateCredentials(): void {
    if (!this.username?.trim()) {
      throw new Error('El nombre de usuario es requerido');
    }
    if (!this.password) {
      throw new Error('La contraseña es requerida');
    }
  }
}