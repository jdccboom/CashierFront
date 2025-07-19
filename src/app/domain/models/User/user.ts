export class User {
  constructor(
    public readonly id: number,
    public readonly names: string,
    public readonly surnames: string,
    public readonly accumulatePoints: number,
    public readonly userActive: boolean,
  ) {
    this.validateUser();
  }

  private validateUser(): void {
    if (!this.names?.trim()) {
      throw new Error('El nombre es requerido');
    }
    if (!this.surnames?.trim()) {
      throw new Error('Los apellidos son requeridos');
    }
    if (this.accumulatePoints < 0) {
      throw new Error('Los puntos no pueden ser negativos');
    }
  }

  public getFullName(): string {
    return `${this.names} ${this.surnames}`;
  }

  public isActive(): boolean {
    return this.userActive;
  }

  public updatePoints(newPoints: number): User {
    return new User(
      this.id,
      this.names,
      this.surnames,
      newPoints,
      this.userActive,
    );
  }

  public toggleStatus(): User {
    return new User(
      this.id,
      this.names,
      this.surnames,
      this.accumulatePoints,
      !this.userActive,
    );
  }

  public static create(data: CreateUserData): User {
    return new User(
      0,
      data.names,
      data.surnames,
      data.accumulatePoints,
      data.userActive
    );
  }
}

export interface CreateUserData {
  names: string;
  surnames: string;
  accumulatePoints: number;
  userActive: boolean;
}

export interface UpdateUserData {
  names?: string;
  surnames?: string;
  accumulatePoints?: number;
  userActive?: boolean;
}