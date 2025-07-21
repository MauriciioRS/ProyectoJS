import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AgendarCitaComponent {
  citaForm: FormGroup;
  doctores = ['Dra. Ana Pérez', 'Dr. Juan López', 'Dra. María Torres'];
  sedes = ['Central', 'Norte', 'Sur'];
  especialidades = ['Medicina General', 'Pediatría', 'Cardiología', 'Nutrición'];
  citaAgendada: any = null;

  constructor(private fb: FormBuilder) {
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      doctor: ['', Validators.required],
      sede: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.citaForm.valid) {
      const nuevaCita = {
        id: Date.now(), // ID único basado en timestamp
        ...this.citaForm.value,
        estado: 'programada'
      };
      
      // Obtener citas existentes
      const citasExistentes = localStorage.getItem('citasAgendadas');
      const citas = citasExistentes ? JSON.parse(citasExistentes) : [];
      
      // Agregar nueva cita
      citas.push(nuevaCita);
      
      // Guardar en localStorage
      localStorage.setItem('citasAgendadas', JSON.stringify(citas));
      
      this.citaAgendada = nuevaCita;
      this.citaForm.reset();
    }
  }
}
