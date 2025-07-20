import { Component } from '@angular/core';
import { TableUserComponent } from "../table-user/table-user.component";
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableUserComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  role!:any;

  constructor(private getCurrentUserUseCase: GetCurrentUserUseCase){
  }

  ngOnInit(): void {
    this.getCurrentUserUseCase.execute().subscribe(
      r =>{
        this.role = r?.role
        console.log(this.role)
      }
    );
  }


}
