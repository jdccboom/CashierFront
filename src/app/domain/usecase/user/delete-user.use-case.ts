import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserUseCase {
  constructor(private userGateway: UserGateway) {}

  execute(id: number): Observable<boolean> {
    return this.userGateway.deleteUser(id);
  }
}