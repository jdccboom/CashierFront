import { TestBed } from '@angular/core/testing';
import { CajeroComponent } from './cajero.component';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserGateway } from '@models/User/gateway/user.gateway';

@Component({
  selector: 'app-count-user',
  standalone: true,
  template: ''
})
class MockCountUserComponent {
  @Input() userCount$!: Observable<number>;
}

@Component({
  selector: 'app-table-user',
  standalone: true,
  template: ''
})
class MockTableUserComponent {}

describe('CajeroComponent', () => {
    const mockUserGateway = jasmine.createSpyObj<UserGateway>('UserGateway', [
      'getAllUsers',
      'getUserById',
      'createUser',
      'updateUser',
      'deleteUser',
      'getUserCount',
      'getActiveUsers'
    ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajeroComponent, MockCountUserComponent, MockTableUserComponent],
      providers: [{ provide: UserGateway, useValue: mockUserGateway }]
    }).compileComponents();
  });

  it('debería crear el componente correctamente', () => {
    const fixture = TestBed.createComponent(CajeroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
