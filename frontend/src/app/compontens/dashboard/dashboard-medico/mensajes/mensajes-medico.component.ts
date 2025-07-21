import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Mensaje {
  destinatario: string;
  asunto: string;
  mensaje: string;
  fecha: string;
}

@Component({
  selector: 'app-mensajes-medico',
  templateUrl: './mensajes-medico.component.html',
  styleUrls: ['./mensajes-medico.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class MensajesMedicoComponent {
  public destinatario: string = '';
  public asunto: string = '';
  public mensaje: string = '';
  public mensajeEnviado: boolean = false;
  public mensajesRecibidos: Mensaje[] = [];

  enviarMensaje() {
    // Aquí podrías enviar el mensaje a un backend o guardarlo en localStorage
    this.mensajeEnviado = true;
    setTimeout(() => this.mensajeEnviado = false, 3000);
    this.destinatario = '';
    this.asunto = '';
    this.mensaje = '';
  }
} 