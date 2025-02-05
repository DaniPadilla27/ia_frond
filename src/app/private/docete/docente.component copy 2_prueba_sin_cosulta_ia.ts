// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import { CamposFormativosService } from './data/campos-formativos.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DiagnosticoService } from './data/diagnostico.service';
// import { OpenAIService } from './data/open-ai.service';
// import jsPDF from 'jspdf';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import html2canvas from 'html2canvas';

// interface Subtema {
//   id: number;
//   nombre: string;
//   descripcion: string;
// }

// interface Categoria {
//   id: number;
//   nombre: string;
//   color: string;
//   subtemas: Subtema[];
// }

// interface NivelAprendizaje {
//   grado: number;
//   descripcion: string;
// }

// interface ProcesoAprendizaje {
//   id_categoria: number;
//   nombre_categoria: string;
//   id_subtema: number;
//   nombre_subtema: string;
//   niveles: NivelAprendizaje[];
// }
// @Component({
//   selector: 'app-docente',
//   standalone: true,
//   imports: [CommonModule   , FormsModule,
//   ],
//   templateUrl: './docente.component.html',
//   styleUrls: ['./docente.component.scss'] // Corregido
// })
// export class DocenteComponent implements OnInit {
//     plantel = {
//     nombre: '',
//     clave_centro_trabajo: '',
//     nivel_educativo: '',
//     grado: { nombre: '' },
//     num_alumnos: null as number | null,
//     num_docentes: null as number | null,
//     modalidad: '',
//     organizacion: '',
//     sostenimiento: '',
//     direccion: {
//       calle: '',
//       numero: '',
//       colonia: '',
//       localidad: '',
//       municipio: '',
//       estado: '',
//       pais: 'México'
//     }
//   };

//   plantelId!: number;
//   categorias: Categoria[] = [];
//   categoriaSeleccionada: Categoria | null = null;
//   subtemaSeleccionado: Subtema | null = null;
//   procesoAprendizaje: ProcesoAprendizaje | null = null;
//   subtemasFiltrados: Subtema[] = [];
//   subtemaData: any = null;
//   puntoSeleccionado: string | null = null; // Almacena el punto seleccionado
//   metodologias: string[] = [
//     "Aprendizaje basado en proyectos comunitarios",
//     "STEAM",
//     "Aprendizaje basado en problemas",
//     "Aprendizaje servicio"
//   ];
//   metodologiaSeleccionada: string | null = null; // Metodología seleccionada
//   instrumentosEvaluacion: string[] = [
//     "Rúbrica",
//     "Lista de cotejo",
//     "Guía de observación",
//     "Diario de clases",
//     "Escala de actitudes",
//     "Portafolio de evidencias",
//     "Registro anecdótico"
//   ];
//   instrumentoSeleccionado: string | null = null; // Nuevo estado para el instrumento seleccionado
//   opcionesPeriodicidad: any[] = [];
//   selectedPeriodo: any;
//   selectedTrimestre: any = null;
//   cantidadActividades: number = 1;
//   descripcion_contenido: string | null = null;
//   // puntoSeleccionado: string | null = null;
//   gradoSeleccionado: number | string | null = null;
//   //????   DE AQUI SE GUARDAN LOS DATOS PARA GUARDAR EB LA BD 

//   _categoriaId?: number;
//   _subtemaId?: number;
//   _descripcion?: string;
//   diagnostico1: any;
//   diagnostico2: any;
//   mostrarModal_generral: boolean = false;
//   mostrar_genrado: boolean = false;
//   actividadGenerada: string | null = null;
//   cargando = false;
//   safeActividadGenerada!: SafeHtml;


//   constructor(
//     private http: HttpClient,
//     private route: ActivatedRoute,
//     private camposService: CamposFormativosService,
//     private openAIService: OpenAIService,
//     private diagnosticoService: DiagnosticoService,private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit() {
//     this.plantelId = 8
//     this.obtenerDiagnosticos(8);

//     this.route.params.subscribe(params => {
//       this.plantelId = params['id'];
//       this.cargarPlantel();
//     });

//     this.cargarCategorias();

//     this.camposService.getPeriodos().subscribe(data => {
//       this.opcionesPeriodicidad = data;
//     });

//   }

//     // Función para manejar el click del botón "Generar Actividad"
//     generarActividad() {
//       this.cargando = true;
//       this.mostrar_genrado = true;
//       const contextoEscuela = `
//       Información del plantel:
//       Nombre: ${this.plantel.nombre},
//       Clave: ${this.plantel.clave_centro_trabajo},
//       Nivel Educativo: ${this.plantel.nivel_educativo},
//       Grado: ${this.plantel.grado.nombre},
//       Modalidad: ${this.plantel.modalidad},
//       Número de Alumnos: ${this.plantel.num_alumnos},
//       Número de Docentes: ${this.plantel.num_docentes},
//       Dirección: ${this.plantel.direccion.calle} ${this.plantel.direccion.numero}, 
//                 ${this.plantel.direccion.colonia}, ${this.plantel.direccion.localidad},
//                 ${this.plantel.direccion.municipio}, ${this.plantel.direccion.estado}, 
//                 ${this.plantel.direccion.pais}.
// Diagnóstico 1: ${JSON.stringify(this.diagnostico1, null, 2)},
//    Diagnóstico 2: ${JSON.stringify(this.diagnostico2, null, 2)}. `;


//   //  const pregunta = `Diseña una serie de actividades para estudiantes de grado ${this.gradoSeleccionado}, 
//   //  enfocadas en el campo formativo ${this.categoriaSeleccionada?.nombre || "No especificado"} 
//   //  y específicamente en el tema ${this.subtemaSeleccionado?.nombre || "No especificado"}. ${this._descripcion}
   
//   //  Las actividades deben alinearse con el proceso de aprendizaje basado en ${this.procesoAprendizaje?.nombre_categoria || "No especificado"}, 
//   //  considerando el punto seleccionado: ${this.puntoSeleccionado || "No especificado"}.
   
//   //  Asegúrate de que cada actividad sea adecuada para el nivel educativo correspondiente: Grado ${this.plantel.grado.nombre}.
//   //  Se aplicará la metodología ${this.metodologiaSeleccionada || "No especificada"}.
   
//   //  Además, incluye un instrumento de evaluación en formato ${this.instrumentoSeleccionado || "No especificado"}, 
//   //  para medir de manera objetiva el progreso de los estudiantes.
   
//   //  Las actividades estarán diseñadas para trabajarse de manera ${this.selectedPeriodo?.nombre || "No especificado"}, 
//   //  correspondiente al trimestre ${this.selectedTrimestre?.nombre || this.selectedTrimestre?.id || "No especificado"}.
   
//   //  En total, desarrolla ${this.cantidadActividades || 0} actividades, asegurando que sean adecuadas para los periodos seleccionados.`;
//   const pregunta = `Diseña una serie de actividades para estudiantes de grado ${this.gradoSeleccionado}, 
//   enfocadas en el campo formativo ${this.categoriaSeleccionada?.nombre || "No especificado"} y en el tema ${this.subtemaSeleccionado?.nombre || "No especificado"}.  
  
//   Las actividades deben estar alineadas con el proceso de aprendizaje basado en ${this.procesoAprendizaje?.nombre_categoria || "No especificado"}, 
//   tomando en cuenta el punto seleccionado: ${this.puntoSeleccionado || "No especificado"}.  
  
//   Asegúrate de que cada actividad sea adecuada para el nivel educativo correspondiente (Grado ${this.plantel.grado.nombre}) y siga la metodología ${this.metodologiaSeleccionada || "No especificada"}.  
  
//   Incluye un instrumento de evaluación en formato ${this.instrumentoSeleccionado || "No especificado"}, garantizando una medición objetiva del progreso de los estudiantes.  
  
//   Las actividades estarán diseñadas para trabajarse de manera ${this.selectedPeriodo?.nombre || "No especificado"}, dentro del trimestre ${this.selectedTrimestre?.nombre || this.selectedTrimestre?.id || "No especificado"}.  
  
//   En total, desarrolla ${this.cantidadActividades || 0} actividades, asegurando su adecuación a los periodos seleccionados y su efectividad en el aprendizaje.`;

//  // Llamada al servicio para generar la actividad
//       // this.openAIService.consultaAsistente(pregunta,contextoEscuela).subscribe({
//       //   next: (respuesta) => {
//           const  respuesta2= `
// <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Reporte de Diagnóstico de Actividades de Lenguajes</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             margin: 20px;
//             background-color: #f9f9f9;
//         }
//         h1, h2 {
//             color: #2c3e50;
//         }
//         h3 {
//             color: #2980b9;
//         }
//         table {
//             width: 100%;
//             border-collapse: collapse;
//             margin-bottom: 20px;
//         }
//         th, td {
//             border: 1px solid #ddd;
//             padding: 8px;
//             text-align: left;
//         }
//         th {
//             background-color: #3498db;
//             color: white;
//         }
//         .rubrica {
//             margin-top: 20px;
//             border: 1px solid #2c3e50;
//             padding: 10px;
//             background-color: #ecf0f1;
//         }
//     </style>
// </head>
// <body>

// <h1>Reporte General de Diagnóstico de Actividades de Lenguajes</h1>
// <h2>Contextualización</h2>
// <p>Este documento presenta un diagnóstico de actividades para estudiantes de Grado 1 en el campo formativo de Lenguajes, específicamente en el tema de Comunicación Oral. Las actividades están diseñadas para ser implementadas quincenalmente en el primer trimestre, alineándose con el enfoque de aprendizaje basado en proyectos comunitarios.</p>

// <h2>Objetivo General</h2>
// <p>Fortalecer la capacidad de los estudiantes para expresar necesidades, ideas, emociones y gustos, reflejando su forma de interpretar y actuar en el mundo.</p>

// <h2>Actividades Propuestas</h2>
// <table>
//     <thead>
//         <tr>
//             <th>Actividad</th>
//             <th>Descripción</th>
//             <th>Objetivos Específicos</th>
//             <th>Duración</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>1. Mi Casa Ideal</td>
//             <td>Los estudiantes dibujarán su casa ideal y la expondrán a la clase, explicando sus características y la razón de sus elecciones.</td>
//             <td>- Fomentar la expresión oral<br>- Desarrollar creatividad</td>
//             <td>2 clases (1 semana)</td>
//         </tr>
//         <tr>
//             <td>2. Cuenta Cuentos</td>
//             <td>Los estudiantes crearán un cuento en grupos pequeños y luego lo presentarán mediante una dramatización a sus compañeros.</td>
//             <td>- Fomentar trabajo en equipo<br>- Estimular la creatividad</td>
//             <td>3 clases (2 semanas)</td>
//         </tr>
//         <tr>
//             <td>3. Mercado de Ideas</td>
//             <td>Simular un mercado donde cada estudiante presentará un producto ficticio y convencerá a sus compañeros para que lo "compren", utilizando la comunicación oral.</td>
//             <td>- Desarrollar habilidades de persuasión<br>- Fomentar la expresión de gustos</td>
//             <td>2 clases (1 semana)</td>
//         </tr>
//         <tr>
//             <td>4. Dramatización de Emociones</td>
//             <td>Los estudiantes dramatizarán situaciones que reflejen diferentes emociones, luego discutirán cómo se sienten y cómo manejarlas.</td>
//             <td>- Identificar y expresar emociones<br>- Mejorar la comunicación interpersonal</td>
//             <td>2 clases (1 semana)</td>
//         </tr>
//     </tbody>
// </table>

// <h2>Instrumento de Evaluación</h2>
// <div class="rubrica">
//     <h3>Rúbrica de Evaluación para Comunicación Oral</h3>
//     <table>
//         <thead>
//             <tr>
//                 <th>Criterio</th>
//                 <th>4 - Excelente</th>
//                 <th>3 - Bueno</th>
//                 <th>2 - Satisfactorio</th>
//                 <th>1 - Necesita Mejora</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>Claridad en la expresión</td>
//                 <td>Se expresa con total claridad y fluidez.</td>
//                 <td>Se expresa de manera clara, con algunas pausas.</td>
//                 <td>Se expresa, pero tiene dificultades de claridad.</td>
//                 <td>El discurso es confuso y poco claro.</td>
//             </tr>
//             <tr>
//                 <td>Creatividad en el contenido</td>
//                 <td>Crea un contenido muy original y atractivo.</td>
//                 <td>Presenta un contenido original con algunos elementos creativos.</td>
//                 <td>El contenido es poco original o repetitivo.</td>
//                 <td>No presenta creatividad en su contenido.</td>
//             </tr>
//             <tr>
//                 <td>Participación activa</td>
//                 <td>Participa activamente y anima a otros a hacerlo.</td>
//                 <td>Participa y colabora efectivamente.</td>
//                 <td>Participa de manera mínima.</td>
//                 <td>No participa y se muestra desinteresado.</td>
//             </tr>
//             <tr>
//                 <td>Uso adecuado del lenguaje</td>
//                 <td>Utiliza un lenguaje apropiado y variado.</td>
//                 <td>Utiliza un lenguaje adecuado en su mayoría.</td>
//                 <td>Utiliza un lenguaje simple y limitado.</td>
//                 <td>El lenguaje utilizado es inapropiado.</td>
//             </tr>
//         </tbody>
//     </table>
// </div>

// <h2>Conclusiones</h2>
// <p>Las actividades propuestas buscan involucrar a los estudiantes en un proceso de aprendizaje significativo, donde puedan expresarse de diversas maneras. La evaluación mediante la rúbrica permitirá un seguimiento efectivo del progreso de cada estudiante y proporcionará información valiosa para futuras intervenciones y mejoras pedagógicas.</p>

// </body>
// </html>`;
//           // this.actividadGenerada = respuesta;
//           console.log(this.actividadGenerada)
//           // const bodyContent = this.extractBodyContent(this.actividadGenerada);
          
//           this.actividadGenerada = respuesta2;
//           // this.safeActividadGenerada = this.sanitizer.bypassSecurityTrustHtml(respuesta2);
//           const bodyContent = this.extractBodyContent(this.actividadGenerada);
//           this.safeActividadGenerada = this.sanitizer.bypassSecurityTrustHtml(bodyContent);

//           console.log(this.actividadGenerada)
//           setTimeout(() => {
//             this.mostrar_genrado = true; // Mostrar modal con la actividad generada
//             this.mostrarModal_generral = false;
//             this.cargando = false;
//           }, 2000); // 2000 ms = 2 segundos
          
//       //   },
//       //   error: (error) => {
//       //     this.cargando = false;
//       //     console.error("Error generando la actividad", error);
//       //   }
//       // });
// // console.log(pregunta)


//     }
//     extractBodyContent(html: string): string {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');
//       const bodyContent = doc.body.innerHTML;  // Extrae solo el contenido del <body>
//       return bodyContent;
//     }
//     generarPDF() {
//       const element = document.getElementById("contenido-generado");
//       if (!element) {
//         console.error("No se encontró el contenido para generar el PDF.");
//         return;
//       }
    
//       const doc = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = 210; // Ancho en mm (A4)
//       const pageHeight = 297; // Alto en mm (A4)
//       const margin = 10; // Margen para evitar cortes
    
//       html2canvas(element, {
//         scale: 1, // Ajusta el tamaño para evitar que el contenido sea gigante
//         useCORS: true, // Permite renderizar imágenes externas correctamente
//         logging: false // Desactiva logs en la consola
//       }).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
    
//         let imgWidth = pageWidth - margin * 2; // Ajusta al tamaño de la página
//         let imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//         let yPos = margin; // Posición inicial en la página
//         let pageNumber = 1;
    
//         while (imgHeight > 0) {
//           doc.addImage(imgData, 'PNG', margin, yPos, imgWidth, imgHeight);
          
//           imgHeight -= pageHeight - margin * 2; // Restamos la altura de la página
//           yPos = -imgHeight + margin; // Ajustamos la posición de la imagen en la nueva página
          
//           if (imgHeight > 0) {
//             doc.addPage(); // Añadimos una nueva página si aún queda contenido
//             pageNumber++;
//           }
//         }
    
//         doc.save('Reporte_Diagnostico_Educativo.pdf');
//       }).catch(error => {
//         console.error("Error al generar el PDF:", error);
//       });
//     }
    
    
    
    

//   obtenerDiagnosticos(id: number): void {
//     this.diagnosticoService.getDiagnostico1(id).subscribe(
//       (data) => {
//         this.diagnostico1 = data;
//       },
//       (error) => {
//         console.error('Error obteniendo Diagnóstico 1:', error);
//       }
//     );

//     this.diagnosticoService.getDiagnostico2(id).subscribe(
//       (data) => {
//         this.diagnostico2 = data;
//       },
//       (error) => {
//         console.error('Error obteniendo Diagnóstico 2:', error);
//       }
//     );
//   }

//   // seleccionarPeriodicidad(event: Event) {
//   //   console.log("Periodicidad seleccionada:", this.selectedPeriodo);
//   // } 
//   guardarConfiguracion() {
//     console.log("=== Configuración guardada ===");
//     console.log("Plantel:", this.plantel);
//     console.log("Categoría seleccionada:", this.categoriaSeleccionada);
//     console.log("Subtema seleccionado:", this.subtemaSeleccionado);
//     console.log("Proceso de Aprendizaje:", this.procesoAprendizaje);
//     console.log("Punto seleccionado:", this.puntoSeleccionado);
//     console.log("Metodología seleccionada:", this.metodologiaSeleccionada);
//     console.log("Instrumento de evaluación seleccionado:", this.instrumentoSeleccionado);
//     console.log("Periodicidad seleccionada:", this.selectedPeriodo);
//     console.log("Trimestre seleccionado:", JSON.stringify(this.selectedTrimestre?.nombre || this.selectedTrimestre?.id));
//     console.log("Cantidad de actividades:", this.cantidadActividades);
//     console.log("Grado:", this.gradoSeleccionado);

//     // Mostrar modal con la información
//     this.mostrarModal_generral = true;
//   }
//   cerrarModal() {
//     this.mostrarModal_generral = false;
//   }

//   verDiagnosticoCompleto(diagnostico: number) {
//     if (diagnostico === 1) {
//       alert("Diagnóstico 1 completo:\n" + JSON.stringify(this.diagnostico1, null, 2));
//     } else if (diagnostico === 2) {
//       alert("Diagnóstico 2 completo:\n" + JSON.stringify(this.diagnostico2, null, 2));
//     }
//   }
  


//   seleccionarTrimestre(trimestre: any) {
//     this.selectedTrimestre = trimestre;
//   }
//   seleccionarMetodologia(metodologia: string) {
//     console.log("metodologia----------_",metodologia)
//     this.metodologiaSeleccionada = metodologia;
//   }
//   seleccionarInstrumento(instrumento: string) {
//     this.instrumentoSeleccionado = instrumento;
//   }
//   // Método para seleccionar un punto específico
//   seleccionarPunto(punto: string, grado: number | undefined): void {
//     console.log('Nivel recibido:', grado); // Verificación en consola
  
//     this.puntoSeleccionado = punto;
//     this.gradoSeleccionado = grado ?? 'No definido';
  
//     console.log(`Punto seleccionado: ${punto}, Grado: ${this.gradoSeleccionado}`);
//   }
//   seleccionarPeriodicidad(event: any) {
//     this.selectedPeriodo = event.target.value ? JSON.parse(event.target.value) : null;
//     this.selectedTrimestre = null; // Resetear trimestre al cambiar la periodicidad
//   }

//   cargarPlantel() {
//     this.http.get(`${environment.api}/api/plantel/8`).subscribe((data: any) => {
//       this.plantel = {
//         nombre: data.nombre,
//         clave_centro_trabajo: data.clave_centro_trabajo,
//         nivel_educativo: data.nivel_educativo,
//         modalidad: data.modalidad,
//         organizacion: data.organizacion,
//         sostenimiento: data.sostenimiento,
//         num_alumnos: data.num_alumnos,
//         num_docentes: data.num_docentes,
//         direccion: data.direccion,
//         grado: data.grado
//       };
//     });
//   }

//   cargarCategorias() {
//     this.camposService.getCategorias().subscribe(data => {
//       this.categorias = data.categorias.map((categoria: any, index: number) => ({
//         ...categoria,
//         color: this.obtenerColor(index)
//       }));
//     });
//   }
//   seleccionarCategoria(id: number) {
//     // console.log("...-----",id)
//     this._categoriaId=id
//     this.categoriaSeleccionada = this.categorias.find(cat => cat.id === id) || null;
//     this.subtemaSeleccionado = null;
//     this.procesoAprendizaje = null;
//     this.subtemasFiltrados = this.categoriaSeleccionada ? this.categoriaSeleccionada.subtemas : [];
//   }

//   // seleccionarSubtema(subtema: Subtema) {
//   //   console.log("hhhhhh---------",subtema)
//   //   this.subtemaSeleccionado = subtema;
//   //   this.procesoAprendizaje = null;
//   //   this.cargarProcesoAprendizaje();
//   // }
//   seleccionarSubtema(subtema: Subtema) {
//     // console.log("hhhhhh---------", subtema);
    
//     this.subtemaSeleccionado = subtema;
//     this.procesoAprendizaje = null;

//     // Asignación de datos
//     // this._categoriaId = subtema.id;
//     this._subtemaId = subtema.id;
//     this._descripcion = subtema.descripcion;

//     this.cargarProcesoAprendizaje();
// }

//   cargarProcesoAprendizaje() {
//     if (!this.categoriaSeleccionada || !this.subtemaSeleccionado) return;
  
//     this.camposService.getSubtemaById(this.categoriaSeleccionada.id, this.subtemaSeleccionado.id)
//       .subscribe({
//         next: (data) => {
//           this.procesoAprendizaje = data || null;
//         },
//         error: (error) => {
//           console.error('Error al cargar proceso de aprendizaje:', error);
//         }
//       });
//   }
    
//   // Dentro del componente DocenteComponent
// transformarDescripcion(descripcion: string): string[] {
//   return descripcion ? descripcion.split('. ').filter(p => p.trim() !== '') : [];
// }

//   obtenerColor(index: number): string {
//     const colores = ['#d8454bff', '#0161abff', '#5ba046ff', '#354190ff', '#ffa533', '#8d33ff'];
//     return colores[index % colores.length];
//   }

// }
