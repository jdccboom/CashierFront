import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CajeroComponent } from "../pages/cajero/cajero.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { ModalComponent } from "../pages/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [/* RouterOutlet, */ ModalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
