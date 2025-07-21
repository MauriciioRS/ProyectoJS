import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const nuevoUsuario = this.registroForm.value;
      
      // Guardar en la lista de usuarios
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      // Guardar como usuario actual para que aparezca en el panel
      localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
      
      this.registroExitoso = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1800);
    } else {
      this.mostrarErrores();
    }
  }

  mostrarErrores() {
    const form = this.registroForm;
    let mensaje = 'Por favor, corrija los siguientes errores:\n\n';

    if (form.get('nombre')?.invalid) {
      mensaje += '• Nombre es requerido\n';
    }
    if (form.get('dni')?.invalid) {
      mensaje += '• DNI es requerido\n';
    }
    if (form.get('fechaNacimiento')?.invalid) {
      mensaje += '• Fecha de nacimiento es requerida\n';
    }
    if (form.get('celular')?.invalid) {
      mensaje += '• Número de celular es requerido o inválido\n';
    }
    if (form.get('direccion')?.invalid) {
      mensaje += '• Dirección es requerida\n';
    }
    if (form.get('email')?.invalid) {
      mensaje += '• Correo electrónico es inválido\n';
    }
    if (form.get('password')?.invalid) {
      mensaje += '• Contraseña es requerida\n';
    }
    if (form.get('confirmPassword')?.invalid) {
      mensaje += '• Debe confirmar la contraseña\n';
    }
    if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
      mensaje += '• Las contraseñas no coinciden\n';
    }

    alert(mensaje);
  }
}
