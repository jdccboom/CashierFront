import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@models/User/user';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type!:String;
  @Input() user!:User
  @Output() delete = new EventEmitter<User>();
  @Output() edit = new EventEmitter<User>();

  onDelete(){
    this.delete.emit(this.user);
  }
  onEdit(){
    this.edit.emit(this.user);
  }
}
