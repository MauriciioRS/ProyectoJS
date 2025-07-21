import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  dni: string;
  celular: string;
}

@Component({
  selector: 'app-gestion-perfil',
  standalone: true,
  templateUrl: './gestion-perfil.component.html',
  styleUrls: ['./gestion-perfil.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class GestionPerfilComponent {
  usuarios: Usuario[] = [];
  filtroRol: string = '';
  busqueda: string = '';
  usuarioSeleccionado: Usuario | null = null;
  mostrarFormulario: boolean = false;
  modoEdicion: boolean = false;
  usuarioEditando: Usuario | null = null;
  nuevoUsuario: Usuario = { nombre: '', email: '', rol: '', estado: 'activo', dni: '', celular: '' };

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(u =>
      (!this.filtroRol || u.rol === this.filtroRol) &&
      (!this.busqueda || u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) || u.email.toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.mostrarFormulario = false;
    this.modoEdicion = false;
  }

  limpiarSeleccion() {
    this.usuarioSeleccionado = null;
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.usuarioEditando = null;
  }

  toggleEstado(usuario: Usuario) {
    usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    this.guardarUsuarios();
  }

  eliminarUsuario(usuario: Usuario) {
    this.usuarios = this.usuarios.filter(u => u !== usuario);
    this.guardarUsuarios();
    this.limpiarSeleccion();
  }

  mostrarFormNuevoUsuario() {
    this.mostrarFormulario = true;
    this.usuarioSeleccionado = null;
    this.modoEdicion = false;
    this.usuarioEditando = null;
    this.nuevoUsuario = { nombre: '', email: '', rol: '', estado: 'activo', dni: '', celular: '' };
  }

  agregarUsuario(nuevo: Usuario) {
    this.usuarios.push(nuevo);
    this.guardarUsuarios();
    this.mostrarFormulario = false;
    this.nuevoUsuario = { nombre: '', email: '', rol: '', estado: 'activo', dni: '', celular: '' };
  }

  editarUsuario(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioEditando = { ...usuario };
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = null;
  }

  guardarEdicion() {
    if (this.usuarioEditando) {
      const idx = this.usuarios.findIndex(u => u.email === this.usuarioEditando!.email);
      if (idx !== -1) this.usuarios[idx] = { ...this.usuarioEditando };
      this.guardarUsuarios();
      this.modoEdicion = false;
      this.usuarioEditando = null;
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.usuarioEditando = null;
  }

  guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
} 