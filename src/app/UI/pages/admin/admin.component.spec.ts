import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminComponent } from './admin.component';
import { GetCurrentUserUseCase } from '@usecase/user/get-current-user.use-case';
import { AuthUser, UserRole } from '@models/Auth/auth-user';
import { UserGateway } from '@models/User/gateway/user.gateway';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockGetCurrentUserUseCase: jasmine.SpyObj<GetCurrentUserUseCase>;
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
    mockGetCurrentUserUseCase = jasmine.createSpyObj('GetCurrentUserUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        { provide: GetCurrentUserUseCase, useValue: mockGetCurrentUserUseCase },
        { provide: UserGateway, useValue: mockUserGateway }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al caso de uso GetCurrentUserUseCase y asignar el rol', () => {
    const mockUser = new AuthUser('test', UserRole.ADMIN, true)
    

    // Simulamos la respuesta del caso de uso
    mockGetCurrentUserUseCase.execute.and.returnValue(of(mockUser));

    // Llamamos al ciclo de vida ngOnInit
    component.ngOnInit();

    expect(mockGetCurrentUserUseCase.execute).toHaveBeenCalled();
    expect(component.role).toBe('admin');
  });

  it('debería asignar undefined si no hay usuario', () => {
    mockGetCurrentUserUseCase.execute.and.returnValue(of(null));

    component.ngOnInit();

    expect(mockGetCurrentUserUseCase.execute).toHaveBeenCalled();
    expect(component.role).toBeUndefined();
  });
});
