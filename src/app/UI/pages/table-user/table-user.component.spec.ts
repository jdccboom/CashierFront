import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUserComponent } from './table-user.component';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { of } from 'rxjs';
import { User } from '@models/User/user';

describe('Pruebas del componente TableUserComponent', () => {
  let component: TableUserComponent;
  let fixture: ComponentFixture<TableUserComponent>;

  const mockUsers: User[] = [
      new User( 1, 'Juan', 'Pérez', 100, true ),
      new User( 2, 'Ana', 'López', 200, false )
    ];

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
    mockUserGateway.getAllUsers.and.returnValue(of(mockUsers));
    mockUserGateway.deleteUser.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      imports: [TableUserComponent],
      providers: [
        { provide: UserGateway, useValue: mockUserGateway }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar users$ con la lista de usuarios obtenida de getAllUsers()', (done) => {
    component.users$.subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
      done();
    });
  });

  it('debería eliminar un usuario correctamente al llamar onDelete()', (done) => {
    const usuarioAEliminar = mockUsers[0];

    mockUserGateway.getAllUsers.calls.reset();
    mockUserGateway.deleteUser.calls.reset();

    component.onDelete(usuarioAEliminar);

    expect(mockUserGateway.deleteUser).toHaveBeenCalledWith(usuarioAEliminar.id);
    expect(mockUserGateway.getAllUsers).toHaveBeenCalledTimes(1);

    component.users$.subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
