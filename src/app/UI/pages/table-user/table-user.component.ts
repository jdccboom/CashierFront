import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { User } from '../../../domain/models/users/user';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ds/buttons/button/button.component';

@Component({
  selector: 'app-table-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './table-user.component.html',
  styleUrl: './table-user.component.scss'
})
export class TableUserComponent implements OnInit{

  users$!: Observable<User[]>

  role: String = "Admin"

  constructor(){
  }

  ngOnInit(): void {
    const mockUsers: User[] = [
      { id: 1, names: 'Juan', surnames: 'Pérez', accumulatePoints: 120, isActive: true, role:"cajero" },
      { id: 2, names: 'Ana', surnames: 'García', accumulatePoints: 95, isActive: false, role:"cajero" },
      { id: 3, names: 'Carlos', surnames: 'Ramírez', accumulatePoints: 200, isActive: true, role:"cajero" }
    ];
    this.users$ = of(mockUsers);
  }

  onDelete(userDelete: User){
    let userFound:any;
    this.users$.pipe(take(1)).subscribe(userFind=>{
      userFound = userFind.find(u => u.id === userDelete.id)
    })
  }


}
