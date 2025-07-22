import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    HttpClientModule
  ]
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registroForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nombres: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      direccion: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      fechaN: ['', Validators.required],
      rol: ['paciente']
    });
  }

  onSubmit() {
    if (this.registroForm.valid && this.registroForm.get('password')?.value === this.registroForm.get('confirmPassword')?.value) {
      const nuevoUsuario = {
        ...this.registroForm.value,
        estado: 'activo'
      };

      
      this.http.post('https://proyectojs-production.up.railway.app/api/auth/register', nuevoUsuario)
        .subscribe({
          next: (res) => {
            console.log('Registro exitoso:', res);
            this.registroExitoso = true;
            setTimeout(() => this.router.navigate(['/login']), 1800);
          },
          error: (err) => {
            console.error('Error en registro:', err);
            alert('Error al registrar el usuario. Intente nuevamente.');
          }
        });

    } else {
      this.mostrarErrores();
    }
  }

  mostrarErrores() {
    const f = this.registroForm;
    let mensaje = 'Por favor, corrija los siguientes errores:\n\n';

    if (f.get('dni')?.invalid) mensaje += '• DNI inválido\n';
    if (f.get('nombres')?.invalid) mensaje += '• Nombres son requeridos\n';
    if (f.get('apellidoP')?.invalid) mensaje += '• Apellido Paterno es requerido\n';
    if (f.get('apellidoM')?.invalid) mensaje += '• Apellido Materno es requerido\n';
    if (f.get('edad')?.invalid) mensaje += '• Edad es requerida o inválida\n';
    if (f.get('sexo')?.invalid) mensaje += '• Sexo es requerido\n';
    if (f.get('email')?.invalid) mensaje += '• Correo electrónico inválido\n';
    if (f.get('telefono')?.invalid) mensaje += '• Teléfono inválido\n';
    if (f.get('direccion')?.invalid) mensaje += '• Dirección requerida\n';
    if (f.get('fechaN')?.invalid) mensaje += '• Fecha de nacimiento requerida\n';
    if (f.get('password')?.invalid) mensaje += '• Contraseña requerida\n';
    if (f.get('confirmPassword')?.invalid) mensaje += '• Confirmación de contraseña requerida\n';
    if (f.get('password')?.value !== f.get('confirmPassword')?.value) mensaje += '• Las contraseñas no coinciden\n';

    alert(mensaje);
  }
}
