import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() title: string = '';
  /* @Input() */ show: boolean = true;
  @Output() close = new EventEmitter<void>();
  @Output() usuarioAgregado = new EventEmitter<any>();

  usuario = {
    id: null,
    nombres: '',
    apellidos: '',
    puntosAcumulados: null,
    usuarioActivo: false
  };

  onClose() {
    this.close.emit();
    this.resetForm();
  }

  agregarUsuario() {
    this.usuarioAgregado.emit(this.usuario);
    this.onClose();
  }

  resetForm() {
    this.usuario = {
      id: null,
      nombres: '',
      apellidos: '',
      puntosAcumulados: null,
      usuarioActivo: false
    };
  }

}
