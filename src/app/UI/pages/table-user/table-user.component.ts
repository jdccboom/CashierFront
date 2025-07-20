import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { User } from '../../../domain/models/User/user';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ds/buttons/button/button.component';
import { UserGateway } from '@models/User/gateway/user.gateway';

@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent implements OnInit{

  users$!: Observable<User[]>

  @Input() role!: String;

  constructor(private userGateway: UserGateway){
  }

  ngOnInit(): void {
    this.users$ = this.userGateway.getAllUsers();
  }

  onDelete(userDelete: User){
    this.userGateway.deleteUser(userDelete.id);
    this.users$ = this.userGateway.getAllUsers();
  }


}
