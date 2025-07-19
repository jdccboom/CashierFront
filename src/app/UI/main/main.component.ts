import { Component } from '@angular/core';
/* import { AlbumComponent } from '../pages/album/album.component';*/
import { TableUserComponent } from '../pages/table-user/table-user.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableUserComponent/*, AlbumComponent */],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
