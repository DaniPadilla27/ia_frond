import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../public/header/header.component';

@Component({
  selector: 'app-diagnostico1',
  templateUrl: './diagnostico1.component.html',
  styleUrls: ['./diagnostico1.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class Diagnostico1Component {
  // URL base de la API (se agregará el "/8" en la llamada)
  apiUrl = 'http://localhost:3000/api/diagnostico1';

  // Estructura de categorías e indicadores (el usuario solo podrá modificar calificación y observaciones)
  categorias = [
    {
      nombre: 'Socioeconómico',
      indicadores: [
        { nombre: 'El nivel de vida de las familias es bajo.', calificacion: null, observaciones: '' },
        { nombre: 'Existe un alto índice de desempleo en la comunidad.', calificacion: null, observaciones: '' },
        { nombre: 'El acceso a servicios básicos como luz, agua potable, drenaje, internet, etc. es limitado.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Cultural',
      indicadores: [
        { nombre: 'La escuela reconoce y valora la diversidad cultural.', calificacion: null, observaciones: '' },
        { nombre: 'Las tradiciones locales se integran en las actividades escolares.', calificacion: null, observaciones: '' },
        { nombre: 'Existe un clima de respeto entre los diferentes grupos culturales.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Político',
      indicadores: [
        { nombre: 'Las políticas educativas locales apoyan la Nueva Escuela Mexicana.', calificacion: null, observaciones: '' },
        { nombre: 'La comunidad participa activamente en las decisiones escolares.', calificacion: null, observaciones: '' },
        { nombre: 'Existen conflictos sociales que afectan el funcionamiento de la escuela.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Ambiental',
      indicadores: [
        { nombre: 'Las condiciones climáticas dificultan el desarrollo de actividades al aire libre.', calificacion: null, observaciones: '' },
        { nombre: 'La escuela promueve prácticas ecológicas.', calificacion: null, observaciones: '' }
      ]
    },
    {
      nombre: 'Global',
      indicadores: [
        { nombre: 'La escuela utiliza tecnologías de la información y comunicación.', calificacion: null, observaciones: '' },
        { nombre: 'Los docentes se actualizan sobre las tendencias educativas internacionales.', calificacion: null, observaciones: '' }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  guardarDiagnostico() {
    // Se arma un arreglo de objetos que incluye:
    // plantel_id, categoria, indicador, calificacion y observaciones.
    const datos = this.categorias.flatMap(categoria =>
      categoria.indicadores.map(indicador => ({
        plantel_id: 8,
        categoria: categoria.nombre,
        indicador: indicador.nombre,
        calificacion: indicador.calificacion,
        observaciones: indicador.observaciones
      }))
    );

    // Enviamos el payload al endpoint: http://localhost:3000/api/diagnostico1/8
    this.http.put(`${this.apiUrl}/8`, datos).subscribe(
      response => {
        console.log('Diagnóstico guardado:', response);
        alert('Diagnóstico guardado con éxito');
      },
      error => {
        console.error('Error al guardar:', error);
        alert('Hubo un error al guardar el diagnóstico');
      }
    );
  }

  generarCINIA() {
    // Lógica para la generación de CIN IA (por el momento, solo muestra un mensaje)
    console.log('Generando CIN IA...');
    alert('Generando CIN IA...');
  }
  
}
