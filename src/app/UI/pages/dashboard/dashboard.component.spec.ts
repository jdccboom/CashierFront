import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserGateway } from '@models/User/gateway/user.gateway';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockUserGateway = jasmine.createSpyObj<UserGateway>('UserGateway', [
      'getAllUsers',
      'getUserById',
      'createUser',
      'updateUser',
      'deleteUser',
      'getUserCount',
      'getActiveUsers'
    ]);
  const mockAuthGateway = jasmine.createSpyObj<AuthGateway>('AuthGateway', [
      'authenticate',
      'getCurrentUser',
      'logout',
      'isAuthenticated'
    ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: UserGateway, useValue: mockUserGateway },
        { provide: AuthGateway, useValue: mockAuthGateway }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre "Leal" en la barra de navegación', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarBrand = compiled.querySelector('.navbar-brand');
    expect(navbarBrand?.textContent).toContain('Leal');
  });

  it('debería tener un botón con el texto "Cerrar sesión"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Cerrar sesión');
  });

  it('debería llamar al método logout al hacer clic en el botón', () => {
    spyOn(component, 'logout');

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button'));
    buttonDe.triggerEventHandler('click', null);

    expect(component.logout).toHaveBeenCalled();
  });
});
