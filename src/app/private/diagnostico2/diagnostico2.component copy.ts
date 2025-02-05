import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../public/header/header.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de importar la extensión autoTable


declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}
@Component({
  selector: 'app-diagnostico2',
  templateUrl: './diagnostico2.component.html',
  styleUrls: ['./diagnostico2.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class Diagnostico2Component {
  // URL base para guardar el diagnóstico
  apiUrl = 'http://localhost:3000/api/diagnostico2';

  // URL para generar el reporte CIN IA para Diagnóstico 2 (endpoint a implementar en el backend)
  generateUrl = 'http://localhost:3000/api/generate-cin-ia-d2';

  // Variables para mostrar el estado de carga y el reporte generado
  loading = false;
  diagnostico2Text = '';

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
    // Muestra mensaje de carga y actualiza el estado
    this.loading = true;
    this.diagnostico2Text = 'Generando CIN IA...';

    // Llama al endpoint que genera el reporte para Diagnóstico 2
    this.http.post(`${this.generateUrl}/8`, {}).subscribe(
      (response: any) => {
        // Se espera que la respuesta tenga una propiedad 'diagnostico2'
        this.loading = false;
        this.diagnostico2Text = response.diagnostico2;
      },
      error => {
        console.error('Error al generar CIN IA:', error);
        this.loading = false;
        alert('Hubo un error al generar CIN IA');
      }
    );
  }



  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Resetea la altura para recalcular correctamente
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura automáticamente
  }




  generaPdf() {
    const doc = new jsPDF();
  
    // Agregar título
    doc.setFontSize(18);
    doc.text('Reporte de Diagnóstico Escolar 2', 20, 20);
  
    // Agregar fecha
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
  
    // Configurar espacio inicial para el contenido
    let startY = 40;
  
    this.categorias.forEach(categoria => {
      // Agregar nombre de la categoría
      doc.setFontSize(14);
      doc.text(categoria.nombre, 20, startY);
      startY += 6;
  
      // Crear tabla de indicadores
      const tableData = categoria.indicadores.map(indicador => [
        indicador.nombre,
        indicador.calificacion !== null ? indicador.calificacion : '',
        indicador.observaciones
      ]);
  
      doc.autoTable({
        head: [['Indicador', 'Calificación', 'Observaciones']],
        body: tableData,
        startY: startY,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [100, 100, 255] },
        columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 30 }, 2: { cellWidth: 60 } }
      });
  
      // Ajustar posición para la siguiente categoría
      startY = doc.autoTable.previous.finalY + 10;
    });
  
    // Guardar el PDF
    doc.save('diagnostico_escolar_2.pdf');
  }
  
  
  
}
