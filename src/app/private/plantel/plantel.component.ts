import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../src/environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../public/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plantel',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './plantel.component.html',
  styleUrls: ['./plantel.component.scss']
})
export class PlantelComponent implements OnInit {
  plantelId!: number;
  plantel = {
    nombre: '',
    clave_centro_trabajo: '',
    nivel_educativo: '',
    grado: { nombre: '' },
    num_alumnos: null as number | null,
    num_docentes: null as number | null,
    modalidad: '',
    organizacion: '',
    sostenimiento: '',
    direccion: {
      calle: '',
      numero: '',
      colonia: '',
      localidad: '',
      municipio: '',
      estado: '',
      pais: 'México'
    }
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.plantelId = params['id'];
      this.cargarPlantel();
    });
  }

  cargarPlantel() {
    this.http.get(`${environment.api}/api/plantel/8`) // Usar plantelId dinámico
      .subscribe((data: any) => {
        this.plantel = {
          nombre: data.nombre,
          clave_centro_trabajo: data.clave_centro_trabajo,
          nivel_educativo: data.nivel_educativo,
          modalidad: data.modalidad,
          organizacion: data.organizacion,
          sostenimiento: data.sostenimiento,
          num_alumnos: data.num_alumnos,
          num_docentes: data.num_docentes,
          direccion: data.direccion, // Usar objeto completo
          grado: data.grado // Usar objeto completo
        };
      });
  }

  onUpdate() {
    if (this.isFormIncomplete()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
  
    this.http.put(`${environment.api}/api/plantel/8`, this.plantel)
      .subscribe({
        next: () => {
          alert('Plantel actualizado exitosamente');
          this.cargarPlantel(); // Recargar datos actualizados
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el plantel');
        }
      });
  }


  private isFormIncomplete(): boolean {
    return !this.plantel.nombre || 
           !this.plantel.clave_centro_trabajo ||
           !this.plantel.direccion.calle;
  }
}