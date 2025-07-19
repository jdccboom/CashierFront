import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';

@Injectable({
  providedIn: 'root'
})
export class GetUserCountUseCase {
  constructor(private userGateway: UserGateway) {}

  execute(): Observable<number> {
    return this.userGateway.getUserCount();
  }
}