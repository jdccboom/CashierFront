import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LogoutUseCase } from '@usecase/auth/logout.use-case';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly routes = inject(Router)

  logout(){
    this.logoutUseCase.execute().pipe(take(1)).subscribe();
    this.routes.navigate(["/login"]);
  }
}
