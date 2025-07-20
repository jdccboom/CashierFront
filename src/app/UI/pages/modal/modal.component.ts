import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '@models/User/user';
import { CreateUserUseCase } from '@usecase/user/create-user.use-case';
import { UpdateUserUseCase } from '@usecase/user/update-user.use-case';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() title: string = 'Crear Usuario';
  @Input() show: boolean = false;
  @Input() edit: boolean = false;
  @Input() userModificate!:User
  @Output() close = new EventEmitter<void>();

  user:User = new User(0,"a", "a", 0, false);

  constructor(private createuserUseCase: CreateUserUseCase, private updateUserUseCase: UpdateUserUseCase){}

  ngOnInit(): void {
    if(this.userModificate != undefined){
      this.user = this.userModificate;
    }    
  }


  onClose() {
    this.close.emit();
    this.resetForm();
  }

  editUser(){
    this.updateUserUseCase.execute(this.userModificate.id,this.user);
  }

  agregarUsuario() {
    console.log(this.user)
    this.createuserUseCase.execute(this.user)
    this.onClose();
  }

  resetForm() {}

}
