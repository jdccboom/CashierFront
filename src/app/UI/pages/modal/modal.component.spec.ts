import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '@models/User/user';
import { CreateUserUseCase } from '@usecase/user/create-user.use-case';
import { UpdateUserUseCase } from '@usecase/user/update-user.use-case';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockCreateUserUseCase: jasmine.SpyObj<CreateUserUseCase>;
  let mockUpdateUserUseCase: jasmine.SpyObj<UpdateUserUseCase>;

  beforeEach(async () => {
    mockCreateUserUseCase = jasmine.createSpyObj('CreateUserUseCase', ['execute']);
    mockUpdateUserUseCase = jasmine.createSpyObj('UpdateUserUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [ModalComponent, FormsModule, CommonModule],
      providers: [
        { provide: CreateUserUseCase, useValue: mockCreateUserUseCase },
        { provide: UpdateUserUseCase, useValue: mockUpdateUserUseCase },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializarse con userModificate si se proporciona', () => {
    const userEdit = new User(1, 'Juan', 'Pérez', 30, true);
    component.userModificate = userEdit;
    component.ngOnInit();
    expect(component.user).toEqual(userEdit);
  });

  it('debería emitir el evento de cerrar y reiniciar el formulario al cerrar el modal', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
    expect(component.user).toEqual(new User(0, "Nombre", "Apellido", 0, false));
  });

  it('debería ejecutar createUserUseCase al agregar usuario', () => {
    const newUser = new User(1, 'Carlos', 'López', 25, true);
    component.user = newUser;
    component.agregarUsuario();
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(newUser);
  });

  it('debería ejecutar updateUserUseCase al editar usuario', () => {
    const updatedUser = new User(2, 'Ana', 'Gómez', 40, true);
    component.userModificate = updatedUser;
    component.user = updatedUser;
    component.editUser();
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(updatedUser.id, updatedUser);
  });

  it('debería reiniciar el formulario correctamente', () => {
    component.user = new User(5, 'Luis', 'Ramos', 33, true);
    component.resetForm();
    expect(component.user).toEqual(new User(0, "Nombre", "Apellido", 0, false));
  });
});
