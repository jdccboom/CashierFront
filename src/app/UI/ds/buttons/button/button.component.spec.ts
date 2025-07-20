import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { User } from '@models/User/user';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  // Usuario simulado
  const mockUser = new User( 1, 'Juan', 'Pérez', 100, true );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    // Asignamos un usuario simulado al componente
    component.user = mockUser;
    component.type = 'test';
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir evento de eliminación cuando se llama onDelete()', () => {
    spyOn(component.delete, 'emit');

    component.onDelete();

    expect(component.delete.emit).toHaveBeenCalledWith(mockUser);
  });

  it('debería emitir evento de edición cuando se llama onEdit()', () => {
    spyOn(component.edit, 'emit');

    component.onEdit();

    expect(component.edit.emit).toHaveBeenCalledWith(mockUser);
  });
});
