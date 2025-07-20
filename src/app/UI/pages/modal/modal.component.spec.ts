import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { User } from '@models/User/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateUserUseCase } from '@usecase/user/create-user.use-case';
import { UpdateUserUseCase } from '@usecase/user/update-user.use-case';

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
        { provide: UpdateUserUseCase, useValue: mockUpdateUserUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should have default values', () => {
      expect(component.title).toBe('Crear Usuario');
      expect(component.show).toBe(false);
      expect(component.edit).toBe(false);
      expect(component.user).toEqual(new User(0, "a", "a", 0, false));
    });

    it('should set user to userModificate when userModificate is defined', () => {
      const testUser = new User(1, "Juan", "Pérez", 100, true);
      component.userModificate = testUser;
      
      component.ngOnInit();
      
      expect(component.user).toBe(testUser);
    });

    it('should not change user when userModificate is undefined', () => {
      const originalUser = component.user;
      component.userModificate = undefined as any;
      
      component.ngOnInit();
      
      expect(component.user).toBe(originalUser);
    });
  });

  describe('onClose method', () => {
    it('should emit close event', () => {
      spyOn(component.close, 'emit');
      spyOn(component, 'resetForm');
      
      component.onClose();
      
      expect(component.close.emit).toHaveBeenCalled();
      expect(component.resetForm).toHaveBeenCalled();
    });
  });

  describe('editUser method', () => {
    it('should call updateUserUseCase.execute with correct parameters', () => {
      const testUser = new User(1, "Juan", "Pérez", 100, true);
      component.userModificate = testUser;
      component.user = new User(1, "Juan Carlos", "Pérez López", 150, true);
      
      component.editUser();
      
      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(
        testUser.id, 
        component.user
      );
    });
  });

  describe('agregarUsuario method', () => {
    it('should call createUserUseCase.execute and close modal', () => {
      spyOn(component, 'onClose');
      spyOn(console, 'log');
      const testUser = new User(2, "María", "González", 50, false);
      component.user = testUser;
      
      component.agregarUsuario();
      
      expect(console.log).toHaveBeenCalledWith(testUser);
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(testUser);
      expect(component.onClose).toHaveBeenCalled();
    });
  });

  describe('Input Properties', () => {
    it('should accept title input', () => {
      component.title = 'Editar Usuario';
      expect(component.title).toBe('Editar Usuario');
    });

    it('should accept show input', () => {
      component.show = true;
      expect(component.show).toBe(true);
    });

    it('should accept edit input', () => {
      component.edit = true;
      expect(component.edit).toBe(true);
    });

    it('should accept userModificate input', () => {
      const testUser = new User(3, "Ana", "Martín", 200, true);
      component.userModificate = testUser;
      expect(component.userModificate).toBe(testUser);
    });
  });

  describe('Output Events', () => {
    it('should emit close event when onClose is called', () => {
      let emitted = false;
      component.close.subscribe(() => emitted = true);
      
      component.onClose();
      
      expect(emitted).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete create user flow', () => {
      spyOn(component, 'onClose');
      const newUser = new User(0, "Pedro", "Ramírez", 75, true);
      component.user = newUser;
      
      component.agregarUsuario();
      
      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(newUser);
      expect(component.onClose).toHaveBeenCalled();
    });

    it('should handle complete edit user flow', () => {
      const originalUser = new User(5, "Luis", "Fernández", 300, false);
      const modifiedUser = new User(5, "Luis Carlos", "Fernández Silva", 350, true);
      
      component.userModificate = originalUser;
      component.user = modifiedUser;
      
      component.editUser();
      
      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(
        originalUser.id, 
        modifiedUser
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle when createUserUseCase throws error', () => {
      mockCreateUserUseCase.execute.and.throwError('Create error');
      spyOn(console, 'log');
      
      expect(() => component.agregarUsuario()).toThrowError('Create error');
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle when updateUserUseCase throws error', () => {
      mockUpdateUserUseCase.execute.and.throwError('Update error');
      component.userModificate = new User(1, "Test", "User", 100, true);
      
      expect(() => component.editUser()).toThrowError('Update error');
    });
  });
});
