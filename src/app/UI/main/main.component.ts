import { Component } from '@angular/core';
/* import { AlbumComponent } from '../pages/album/album.component';*/
import { TableUserComponent } from '../pages/table-user/table-user.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet/*,  TableUserComponent */ /*, AlbumComponent */, LoginComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
