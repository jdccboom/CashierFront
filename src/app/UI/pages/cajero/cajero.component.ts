import { Component } from '@angular/core';
import { TableUserComponent } from "../table-user/table-user.component";
import { CountUserComponent } from "../count-user/count-user.component";

@Component({
  selector: 'app-cajero',
  standalone: true,
  imports: [TableUserComponent, CountUserComponent],
  templateUrl: './cajero.component.html',
  styleUrl: './cajero.component.scss'
})
export class CajeroComponent {

}
