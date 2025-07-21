import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  dni: string;
  celular: string;
}

interface Cita {
  paciente: string; // email del paciente
  medico: string;   // email del médico
  fecha: string;
  hora: string;
  estado: string;
  motivo: string;
}

@Component({
  selector: 'app-todas-citas',
  standalone: true,
  templateUrl: './todas-citas.component.html',
  styleUrls: ['./todas-citas.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatIconModule]
})
export class TodasCitasComponent {
  usuarios: Usuario[] = [];
  citas: Cita[] = [];
  filtroEstado: string = '';
  busqueda: string = '';
  mostrarFormulario: boolean = false;
  nuevaCita: Cita = { paciente: '', medico: '', fecha: '', hora: '', estado: 'pendiente', motivo: '' };

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarCitas();
  }

  cargarUsuarios() {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  cargarCitas() {
    const data = localStorage.getItem('citas');
    this.citas = data ? JSON.parse(data) : [];
  }

  get pacientes() {
    return this.usuarios.filter(u => u.rol === 'usuario');
  }

  get medicos() {
    return this.usuarios.filter(u => u.rol === 'medico');
  }

  get citasFiltradas() {
    return this.citas.filter(cita =>
      (!this.filtroEstado || cita.estado === this.filtroEstado) &&
      (!this.busqueda || this.obtenerNombreUsuario(cita.paciente).toLowerCase().includes(this.busqueda.toLowerCase()) || this.obtenerNombreUsuario(cita.medico).toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  obtenerNombreUsuario(email: string): string {
    const usuario = this.usuarios.find(u => u.email === email);
    return usuario ? usuario.nombre : 'No existe';
  }

  obtenerUsuario(email: string): Usuario | undefined {
    return this.usuarios.find(u => u.email === email);
  }

  pacienteInexistente(email: string): boolean {
    return !this.usuarios.find(u => u.email === email && u.rol === 'usuario');
  }

  medicoInexistente(email: string): boolean {
    return !this.usuarios.find(u => u.email === email && u.rol === 'medico');
  }

  mostrarFormNuevaCita() {
    this.mostrarFormulario = true;
    this.nuevaCita = { paciente: '', medico: '', fecha: '', hora: '', estado: 'pendiente', motivo: '' };
  }

  agregarCita() {
    this.citas.push({ ...this.nuevaCita });
    localStorage.setItem('citas', JSON.stringify(this.citas));
    this.mostrarFormulario = false;
    this.nuevaCita = { paciente: '', medico: '', fecha: '', hora: '', estado: 'pendiente', motivo: '' };
  }
} 