import { Routes } from '@angular/router';
import { LoginComponent } from '../UI/pages/login/login.component';
import { DashboardComponent } from '../UI/pages/dashboard/dashboard.component';
import { CajeroComponent } from '../UI/pages/cajero/cajero.component';
import { AdminComponent } from '../UI/pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, 
    children: [
        {path: 'cajero', component: CajeroComponent},
        {path: 'admin', component: AdminComponent}
    ]
   },
  { path: '**', redirectTo: '' }
];
