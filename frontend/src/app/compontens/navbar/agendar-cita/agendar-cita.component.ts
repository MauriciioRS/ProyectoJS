import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AgendarCitaComponent implements OnInit {
  citaForm!: FormGroup;
  medicos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      doctor: ['', Validators.required],
      sede: ['', Validators.required],
      especialidad: ['', Validators.required]
    });

    this.obtenerMedicos();
  }


  obtenerMedicos(): void {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/usuarios/medicos', { headers }).subscribe({
      next: (data) => {
        this.medicos = data;
      },
      error: (err) => {
        console.error('Error al obtener médicos', err);
        alert('No se pudieron obtener los médicos.');
      }
    });
  }

  onSubmit(): void {
    if (this.citaForm.invalid) return;

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user?.dni) {
      alert('Usuario no autenticado.');
      return;
    }

    
  

    const cita = {
      medico: this.citaForm.value.doctor,
      paciente: user.dni,
      fechaC: this.citaForm.value.fecha,
      hora: this.citaForm.value.hora,
      sede: this.citaForm.value.sede,
      especialidad: this.citaForm.value.especialidad,
      fechaA: new Date().toISOString()
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/citas', cita, { headers }).subscribe({
      next: () => {
        alert('Cita agendada con éxito.');
        this.router.navigate(['/mis-citas']);
      },
      error: (err) => {
        console.error('Error al agendar cita', err);
        alert('Hubo un error al agendar la cita.');
      }
    });
  }
}
