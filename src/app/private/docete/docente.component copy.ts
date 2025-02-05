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
//       this.openAIService.consultaAsistente(pregunta,contextoEscuela).subscribe({
//         next: (respuesta) => {
// //           const  respuesta2= `html
// // <!DOCTYPE html>
// // <html lang="es">
// // <head>
// //     <meta charset="UTF-8">
// //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //     <title>Diagnóstico General - Estudiantes de Grado 6</title>
// //     <style>
// //         body {
// //             font-family: Arial, sans-serif;
// //             line-height: 1.6;
// //             margin: 20px;
// //             padding: 20px;
// //             border: 1px solid #cccccc;
// //             border-radius: 10px;
// //             background-color: #f9f9f9;
// //         }
// //         h1, h2, h3, h4 {
// //             color: #2c3e50;
// //         }
// //         p {
// //             margin: 10px 0;
// //         }
// //         ul {
// //             margin: 5px 0;
// //             padding-left: 20px;
// //         }
// //     </style>
// // </head>
// // <body>
// //     <h1>Diagnóstico General - Estudiantes de Grado 6</h1>
// //     <h2>1. Introducción</h2>
// //     <p>Este reporte tiene el objetivo de identificar las características, necesidades y contextos de los estudiantes de grado 6 para elaborar estrategias efectivas de enseñanza-aprendizaje basadas en su realidad.</p>

// //     <h2>2. Datos Demográficos y Contextuales</h2>
// //     <ul>
// //         <li><strong>Número de Alumnos:</strong> 500</li>
// //         <li><strong>Número de Docentes:</strong> 25</li>
// //         <li><strong>Modalidad:</strong> Indígena</li>
// //         <li><strong>Ubicación:</strong> Huejutla, Ciudad de México</li>
// //     </ul>

// //     <h2>3. Características del Estudiante</h2>
// //     <h3>3.1. Diversidad Cultural</h3>
// //     <p>Los estudiantes provienen de diversas culturas indígenas, lo que impacta su idioma, costumbres y perspectivas de vida. Esta diversidad es una fortaleza que se puede explorar en el aula.</p>

// //     <h3>3.2. Capacidades Comunicativas</h3>
// //     <p>Existen variaciones en las habilidades comunicativas entre los alumnos. Algunos estudiantes son más expresivos, mientras que otros requieren apoyo adicional para expresar sus emociones y necesidades.</p>

// //     <h3>3.3. Entorno Familiar</h3>
// //     <p>Las condiciones socioeconómicas de las familias afectan el desempeño escolar. Es importante establecer una comunicación regular con los padres para fomentar su participación en el proceso educativo.</p>

// //     <h2>4. Necesidades Identificadas</h2>
// //     <ul>
// //         <li>Fortalecer la expresión oral y escrita de los estudiantes.</li>
// //         <li>Desarrollar habilidades de trabajo en equipo y comunicación interpersonal.</li>
// //         <li>Fomentar el respeto a la diversidad cultural y la inclusión en el aula.</li>
// //         <li>Mejorar el acceso a recursos y materiales educativos adecuados.</li>
// //     </ul>

// //     <h2>5. Estrategias de Enseñanza-Aprendizaje Propuestas</h2>
// //     <h3>5.1. Aprendizaje Basado en Proyectos</h3>
// //     <p>Implementar proyectos comunitarios que involucren a los alumnos en la investigación y presentación de temas relevantes para su comunidad, fomentando así la comunicación oral y escrita.</p>

// //     <h3>5.2. Talleres de Comunicación</h3>
// //     <p>Realizar talleres que se enfoquen en mejorar las habilidades de expresión oral mediante dinámicas de grupo, juegos de rol y narración de historias.</p>

// //     <h3>5.3. Actividades Interactivas</h3>
// //     <p>Incorporar actividades interactivas que promuevan la participación activa de los estudiantes, facilitando la práctica del lenguaje en situaciones reales.</p>

// //     <h2>6. Instrumento de Evaluación</h2>
// //     <p>Se utilizará una lista de cotejo para evaluar el progreso de los estudiantes en las siguientes áreas:</p>
// //     <h3>Lista de Cotejo para Evaluación de Comunicación Oral</h3>
// //     <ul>
// //         <li><input type="checkbox"> Expresa ideas y emociones de manera clara.</li>
// //         <li><input type="checkbox"> Escucha y responde a las intervenciones de sus compañeros.</li>
// //         <li><input type="checkbox"> Participa activamente en discusiones grupales.</li>
// //         <li><input type="checkbox"> Emplea un vocabulario adecuado para su edad.</li>
// //         <li><input type="checkbox"> Muestra interés en las opiniones de los demás.</li>
// //     </ul>

// //     <h2>7. Conclusiones</h2>
// //     <p>El diagnóstico revela la necesidad de implementar estrategias pedagógicas que promuevan habilidades comunicativas en un entorno inclusivo y que consideren la diversidad cultural de los estudiantes. Las futuras acciones deben enfocarse en el desarrollo de un currículo que refleje la realidad de los alumnos y en la formación continua del personal docente.</p>
// // </body>
// // </html>
// // `;
//           this.actividadGenerada = respuesta;
//           console.log(this.actividadGenerada)
//           const bodyContent = this.extractBodyContent(this.actividadGenerada);

//           // this.actividadGenerada = respuesta2;
//           // this.safeActividadGenerada = this.sanitizer.bypassSecurityTrustHtml(respuesta2);
//           this.safeActividadGenerada = this.sanitizer.bypassSecurityTrustHtml(bodyContent);

//           console.log(this.actividadGenerada)
//           // setTimeout(() => {
//             this.mostrar_genrado = true; // Mostrar modal con la actividad generada
//             this.mostrarModal_generral = false;
//             this.cargando = false;
//           // }, 2000); // 2000 ms = 2 segundos
          
//         },
//         error: (error) => {
//           this.cargando = false;
//           console.error("Error generando la actividad", error);
//         }
//       });
// // console.log(pregunta)


//     }
//     extractBodyContent(html: string): string {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');
//       const bodyContent = doc.body.innerHTML;  // Extrae solo el contenido del <body>
//       return bodyContent;
//     }
    
  
//     generarPDF() {
//       // Verifica que el contenido está listo antes de generar el PDF
//       if (this.actividadGenerada) {
//         // Crea una nueva instancia de jsPDF con el formato A4 y orientación vertical
//         const doc = new jsPDF('p', 'mm', 'a4'); // 'p' es para orientación vertical, 'a4' es el formato
        
//         // Ajustar el tamaño de la fuente para todo el documento
//         doc.setFontSize(12);  // Establece el tamaño de la fuente global (puedes ajustarlo como desees)
        
//         // Definir márgenes generales
//         const marginTop = 20;    // Márgenes superiores
//         const marginLeft = 20;   // Márgenes izquierdo
//         const marginBottom = 20; // Márgenes inferiores
    
//         // Usa el método html() para renderizar el contenido HTML
//         doc.html(this.actividadGenerada, {
//           callback: function (doc) {
//             doc.save('Reporte_Diagnostico_Educativo.pdf'); // Guarda el archivo como PDF
//           },
//           margin: [marginTop, marginLeft, marginBottom, marginLeft], // Márgenes del contenido (para no sobreponer al título)
//           x: marginLeft,  // Posición horizontal de inicio
//           y: marginTop,   // Posición vertical de inicio
//           html2canvas: {
//             scale: 2,               // Mejora la calidad de la conversión
//             useCORS: true,          // Asegura que las imágenes externas se rendericen correctamente
//             letterRendering: true,  // Mejora la precisión en la renderización de letras
//             logging: false          // Desactiva el log para producción
//           },
//           width: 170,  // Ancho máximo de la página (ajústalo según el diseño de tu contenido)
//         });
    
//       } else {
//         console.error("No hay contenido generado para el PDF.");
//       }
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
