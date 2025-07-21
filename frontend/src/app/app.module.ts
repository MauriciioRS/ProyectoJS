import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '.././compontens/autenticación/login/login.component';
import { RegistroComponent } from '.././compontens/autenticación/registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class AppModule { }
