import { Component } from '@angular/core';
import { HeaderComponent } from '../../../app/public/header/header.component'; // Añade HeaderComponent
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plantel',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // Añade HeaderComponent
  templateUrl: './plantel.component.html',
  styleUrl: './plantel.component.scss'
})
export class PlantelComponent {}