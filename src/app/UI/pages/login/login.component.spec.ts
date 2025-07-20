import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginUseCase } from '@usecase/auth/login.use-case';
import { AuthGateway, AuthResult } from '@models/Auth/gatewey/auth.gateway';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser, UserRole } from '@models/Auth/auth-user';

describe('Pruebas del componente LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockAuthGateway = jasmine.createSpyObj<AuthGateway>('AuthGateway', [
    'authenticate',
    'getCurrentUser',
    'logout',
    'isAuthenticated'
  ]);

  const mockLoginUseCase = new LoginUseCase(mockAuthGateway);

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthGateway, useValue: mockAuthGateway },
        { provide: LoginUseCase, useValue: mockLoginUseCase },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar loginUseCase con el email y password correctos', () => {
    // Datos simulados para login
    component.Login.username = 'test@example.com';
    component.Login.password = '123456';

    // Resultado simulado
    const fakeAuthResult: AuthResult = {
      success: true,
      user: new AuthUser('test', UserRole.ADMIN, true)
    };

    // Espiamos el método execute y forzamos un retorno
    spyOn(mockLoginUseCase, 'execute').and.returnValue(of(fakeAuthResult));
    spyOn(console, 'log'); // Espiamos console.log

    component.login();

    // Validaciones
    expect(mockLoginUseCase.execute).toHaveBeenCalledWith('test@example.com', '123456');
    expect(component.auth).toBeTruthy();

    // Validamos que console.log haya sido llamado con el usuario
    component.auth.subscribe(result => {
      expect(console.log).toHaveBeenCalledWith(result.user);
    });
  });
});
