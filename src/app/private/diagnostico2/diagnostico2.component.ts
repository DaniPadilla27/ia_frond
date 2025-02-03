import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../public/header/header.component';

@Component({
  selector: 'app-diagnostico2',
  templateUrl: './diagnostico2.component.html',
  styleUrls: ['./diagnostico2.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class Diagnostico2Component {
  // URL base de la API (se agregará "/8" en la llamada, donde 8 es el plantel_id)
  apiUrl = 'http://localhost:3000/api/diagnostico2';

  // Estructura de categorías e indicadores para el Diagnóstico 2
  categorias = [
    {
      nombre: 'Infraestructura',
      indicadores: [
        { nombre: 'Las instalaciones escolares están en buen estado.', calificacion: null, observaciones: '' },
        { nombre: 'La escuela cuenta con el equipamiento tecnológico necesario.', calificacion: null, observaciones: '' },
        { nombre: 'La escuela es accesible para personas con discapacidad.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Clima escolar',
      indicadores: [
        { nombre: 'Existe un ambiente de respeto y confianza entre los miembros de la comunidad escolar.', calificacion: null, observaciones: '' },
        { nombre: 'Los estudiantes se sienten seguros y valorados y no hay prácticas de acoso y violencia escolar', calificacion: null, observaciones: '' },
        { nombre: 'Se promueve la resolución pacífica de conflictos.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Prácticas pedagógicas',
      indicadores: [
        { nombre: 'Los docentes utilizan diversas metodologías de enseñanza.', calificacion: null, observaciones: '' },
        { nombre: 'La evaluación es formativa y centrada en el aprendizaje.', calificacion: null, observaciones: '' },
        { nombre: 'Los contenidos se relacionan con la vida cotidiana de los estudiantes.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Perfil del alumnado',
      indicadores: [
        { nombre: 'Los estudiantes muestran interés por aprender.', calificacion: null, observaciones: '' },
        { nombre: 'La asistencia a clases es regular.', calificacion: null, observaciones: '' },
        { nombre: 'Existe una gran diversidad de necesidades educativas.', calificacion: null, observaciones: '' },
        { nombre: 'Se cuenta con alumnos con necesidades educativas especiales', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Perfil del docente',
      indicadores: [
        { nombre: 'Los docentes están comprometidos con su trabajo.', calificacion: null, observaciones: '' },
        { nombre: 'Los docentes se actualizan constantemente.', calificacion: null, observaciones: '' },
        { nombre: 'Existe un buen clima laboral.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Participación de las familias',
      indicadores: [
        { nombre: 'Las familias se involucran en las actividades escolares.', calificacion: null, observaciones: '' },
        { nombre: 'La comunicación entre la escuela y las familias es fluida.', calificacion: null, observaciones: '' }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  guardarDiagnostico() {
    // Se arma el arreglo de objetos que se enviará al backend
    const datos = this.categorias.flatMap(categoria =>
      categoria.indicadores.map(indicador => ({
        plantel_id: 8, // Cambia este valor si es necesario
        categoria: categoria.nombre,
        indicador: indicador.nombre,
        calificacion: indicador.calificacion,
        observaciones: indicador.observaciones
      }))
    );

    // Se hace la llamada PUT para actualizar (reemplazar) los datos existentes
    this.http.put(`${this.apiUrl}/8`, datos).subscribe(
      response => {
        console.log('Diagnóstico actualizado:', response);
        alert('Diagnóstico actualizado con éxito');
      },
      error => {
        console.error('Error al actualizar:', error);
        alert('Hubo un error al actualizar el diagnóstico');
      }
    );
  }
  generarCINIA() {
    // Lógica para la generación de CIN IA (por el momento, solo muestra un mensaje)
    console.log('Generando CIN IA...');
    alert('Generando CIN IA...');
  }
}
