import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { LoginUseCase } from '@usecase/auth/login.use-case';
import { AuthGateway } from '@models/Auth/gatewey/auth.gateway';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  const mockAuthGateway = jasmine.createSpyObj<AuthGateway>('AuthGateway', [
    'authenticate',
    'getCurrentUser',
    'logout',
    'isAuthenticated'
  ]);
  const mockLoginUseCase = new LoginUseCase(mockAuthGateway);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        { provide: AuthGateway, useValue: mockAuthGateway },
        { provide: LoginUseCase, useValue: mockLoginUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
