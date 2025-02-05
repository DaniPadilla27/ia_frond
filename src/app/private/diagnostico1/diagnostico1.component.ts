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
  selector: 'app-diagnostico1',
  templateUrl: './diagnostico1.component.html',
  styleUrls: ['./diagnostico1.component.scss'],
  imports: [CommonModule, FormsModule, HeaderComponent]
})
export class Diagnostico1Component {
  // URL base de la API para los diagnósticos
  apiUrl = 'http://localhost:3000/api';
  

  // Estructura de categorías e indicadores (los usuarios modifican solo calificación y observaciones)
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

  // Propiedad para mostrar el estado de carga y el resultado del diagnóstico generado
  loading = false;
  diagnostico1Text = '';
  

  constructor(private http: HttpClient) {}

  guardarDiagnostico() {
    // Arma el arreglo de objetos con plantel_id, categoría, indicador, calificación y observaciones.
    const datos = this.categorias.flatMap(categoria =>
      categoria.indicadores.map(indicador => ({
        plantel_id: 8,
        categoria: categoria.nombre,
        indicador: indicador.nombre,
        calificacion: indicador.calificacion,
        observaciones: indicador.observaciones
      }))
    );

    // Envía el payload al endpoint PUT para actualizar diagnósticos (si es necesario)
    this.http.put(`${this.apiUrl}/diagnostico1/8`, datos).subscribe(
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
    // Al tocar el botón, se muestra el mensaje de "Generando..."
    this.loading = true;
    this.diagnostico1Text = 'Generando CIN IA...';

    // Se invoca el endpoint POST que genera el diagnóstico (Diagnóstico 1)
    this.http.post(`${this.apiUrl}/generate-cin-ia/8`, {}).subscribe(
      (response: any) => {
        // Al recibir la respuesta, se actualiza el área de texto
        this.loading = false;
        this.diagnostico1Text = response.diagnostico1;
      },
      error => {
        console.error('Error al generar CIN IA:', error);
        this.loading = false;
        alert('Hubo un error al generar CIN IA');
      }
    );
  }



  generaPdf() {
    if (!this.diagnostico1Text || this.diagnostico1Text.trim() === '') {
      alert('No hay contenido para generar el reporte.');
      return;
    }
  
    const doc = new jsPDF();
  
    // Agregar título
    doc.setFontSize(18);
    doc.text('Reporte de Diagnóstico Escolar 1', 20, 20);
  
    // Agregar fecha
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 30);
  
    // Agregar el contenido del diagnóstico
    doc.setFontSize(14);
    doc.text('Diagnóstico Generado:', 20, 40);
  
    // Insertar el texto con ajuste automático
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(this.diagnostico1Text, 170); // Ajusta el texto al ancho máximo
  
    let startY = 50; // Posición inicial para el texto
    const maxY = doc.internal.pageSize.height - 20;  // Definir el límite en Y (20px de margen inferior)
  
    // Agregar texto con salto de página si es necesario
    lines.forEach((line: string) => {  // Declarar explícitamente el tipo de 'line' como 'string'
      if (startY + 10 > maxY) {  // Si el contenido excede el espacio de la página
        doc.addPage();           // Agregar una nueva página
        startY = 20;             // Reiniciar la posición de Y para la nueva página
      }
      doc.text(line, 20, startY);  // Insertar la línea de texto
      startY += 10;                // Ajustar la posición para la siguiente línea
    });
  
    // Guardar el archivo PDF
    doc.save('diagnostico_escolar_1.pdf');
  }
  
  
  

}
