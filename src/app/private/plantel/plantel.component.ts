import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../public/header/header.component';
import { FormsModule } from '@angular/forms'; // Added FormsModule

@Component({
  selector: 'app-plantel',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent,
    FormsModule // Added here

  ],
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.scss']
})
// plantel.component.ts
export class PlantelComponent {
  plantel = {
    nombre: '',
    clave_centro_trabajo: '',
    nivel_educativo: '',
    grado: { nombre: '' }, // Cambiar a objeto
    num_alumnos: null,
    num_docentes: null,
    modalidad: '',
    organizacion: '',
    sostenimiento: '',
    direccion: { // Debe ser un objeto, no string
      calle: '',
      numero: '',
      colonia: '',
      localidad: '',
      municipio: '',
      estado: '',
      pais: 'México' // Valor por defecto
    }
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Agregar validación
    if (this.isFormIncomplete()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    const apiUrl = `${environment.api}/api/plantel`;
    this.http.post(apiUrl, this.plantel).subscribe(
      (response) => {
        console.log('Plantel registrado con éxito:', response);
        alert('Plantel registrado exitosamente!');
      },
      (error) => {
        console.error('Error al registrar el plantel:', error);
        alert(`Error: ${error.error?.message || 'Error con la conexión o puede ser otra cosa'}`);
      }
    );
  }

  private isFormIncomplete(): boolean {
    return !this.plantel.nombre || 
           !this.plantel.clave_centro_trabajo ||
           !this.plantel.direccion.calle;
  }
}