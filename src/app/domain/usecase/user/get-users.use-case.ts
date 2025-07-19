import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { User } from '@models/User/user';

@Injectable({
  providedIn: 'root'
})
export class GetUsersUseCase {
  constructor(private userGateway: UserGateway) {}

  execute(): Observable<User[]> {
    return this.userGateway.getAllUsers();
  }
}