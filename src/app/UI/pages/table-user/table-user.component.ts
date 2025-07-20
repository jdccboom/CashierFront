import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { User } from '../../../domain/models/User/user';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ds/buttons/button/button.component';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { ModalComponent } from "../modal/modal.component";
import { DeleteUserUseCase } from '@usecase/user/delete-user.use-case';
import { GetUsersUseCase } from '@usecase/user/get-users.use-case';

@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent implements OnInit{

  users$!: Observable<User[]>

  @Input() role!: String;

  user !:User;

  show = false;
  isEdit = false;

  constructor(private deleteUserUseCase: DeleteUserUseCase, private getUsersUseCase: GetUsersUseCase){
  }

  ngOnInit(): void {
    this.users$ = this.getUsersUseCase.execute();
  }

  onDelete(userDelete: User){
    this.deleteUserUseCase.execute(userDelete.id);
    this.users$ = this.getUsersUseCase.execute();
  }

  onEdit(edit:User){
    this.show = true;
    this.isEdit=true;
    this.user= edit;
  }

  onAdd(showModal: boolean){
    this.show = showModal;
  }

  onCloseModal(){
    this.show = false;
    this.isEdit=false;
  }

}
