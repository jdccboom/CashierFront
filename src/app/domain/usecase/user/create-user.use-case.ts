import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User, CreateUserData } from '@models/User/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUserUseCase {
  constructor(private userGateway: UserGateway) {}

  execute(userData: CreateUserData): Observable<User> {
    // Validaciones de negocio adicionales
    if (userData.accumulatePoints < 0) {
      throw new Error('Los puntos no pueden ser negativos');
    }
    
    return this.userGateway.createUser(userData);
  }
}