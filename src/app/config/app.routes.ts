import { UserRole } from "@models/Auth/auth-user";
import { CajeroComponent } from "../UI/pages/cajero/cajero.component";
import { AdminComponent } from "../UI/pages/admin/admin.component";
import { DashboardComponent } from "../UI/pages/dashboard/dashboard.component";
import { LoginComponent } from "../UI/pages/login/login.component";
import { Routes } from "@angular/router";
import { roleGuard } from "@driven-adapter/guard/role.guard";
import { loginRedirectGuard } from "@driven-adapter/guard/login-redirect.guard";
import { authGuard } from "@driven-adapter/guard/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent, 
    canActivate: [loginRedirectGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'cajero',
        component: CajeroComponent,
        canActivate: [roleGuard, authGuard],
        data: { roles: [UserRole.ADMIN, UserRole.CAJERO] }
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [roleGuard, authGuard],
        data: { roles: [UserRole.ADMIN] }
      },
      { path: '', redirectTo: 'cajero', pathMatch: 'full' },
      { path: '**', redirectTo: 'cajero' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
