import { Component } from '@angular/core';
import { GetUserCountUseCase } from '@usecase/user/get-user-count.use-case';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-count-user',
  standalone: true,
  imports: [],
  templateUrl: './count-user.component.html',
  styleUrl: './count-user.component.scss'
})
export class CountUserComponent {

  countUsers!:number;

  constructor(private userUseCase: GetUserCountUseCase ){

  }

  ngOnInit(): void {
    this.userUseCase.execute().subscribe(
      c=>{
        this.countUsers = c
      }
    );
  }

}
