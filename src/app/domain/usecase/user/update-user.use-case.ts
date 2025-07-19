import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User, UpdateUserData } from '@models/User/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserUseCase {
  constructor(private userGateway: UserGateway) {}

  execute(id: number, userData: UpdateUserData): Observable<User> {
    // Validaciones de negocio
    if (userData.accumulatePoints !== undefined && userData.accumulatePoints < 0) {
      throw new Error('Los puntos no pueden ser negativos');
    }
    
    return this.userGateway.updateUser(id, userData);
  }
}