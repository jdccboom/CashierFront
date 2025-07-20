import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountUserComponent } from './count-user.component';
import { of } from 'rxjs';
import { GetUserCountUseCase } from '@usecase/user/get-user-count.use-case';
import { UserGateway } from '@models/User/gateway/user.gateway';

describe('CountUserComponent', () => {
  let component: CountUserComponent;
  let fixture: ComponentFixture<CountUserComponent>;
  let mockGetUserCountUseCase: jasmine.SpyObj<GetUserCountUseCase>;

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
    mockGetUserCountUseCase = jasmine.createSpyObj('GetUserCountUseCase', ['execute']);
    await TestBed.configureTestingModule({
      imports: [CountUserComponent],
      providers: [
        { provide: GetUserCountUseCase, useValue: mockGetUserCountUseCase },
        { provide: UserGateway, useValue: mockUserGateway }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountUserComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar el conteo de usuarios en ngOnInit', () => {
    const fakeCount = 10;
    mockGetUserCountUseCase.execute.and.returnValue(of(fakeCount));

    component.ngOnInit();

    expect(mockGetUserCountUseCase.execute).toHaveBeenCalled();
    expect(component.countUsers).toBe(fakeCount);
  });
});
