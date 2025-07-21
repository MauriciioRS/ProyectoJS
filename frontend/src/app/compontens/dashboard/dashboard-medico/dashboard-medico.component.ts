import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-medico',
  standalone: true,
  templateUrl: './dashboard-medico.component.html',
  styleUrls: ['./dashboard-medico.component.css'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterModule]
})
export class DashboardMedicoComponent {}
