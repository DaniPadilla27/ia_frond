import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de importar la extensión autoTable


declare module "jspdf" {
  interface jsPDF {
    autoTable: any;
  }
}
const projectInfo = {
  theme: "Reconocimiento y Aprecio de la Diversidad Lingüística",
  generalObjective: "Fomentar el reconocimiento y aprecio por la diversidad lingüística entre los estudiantes a través de actividades lúdicas y de aprendizaje basado en proyectos.",
  duration: "1er Mes del 1er Trimestre",
  evaluationFrequency: "Mensual (al final del mes)",
  activities: [
    {
      name: "1. 'Cuentos del Mundo'",
      description: "Los niños escuchan y comparten cuentos breves en diferentes idiomas (español, inglés, y lenguas indígenas). Al final, cada niño elige su cuento favorito para contar a sus compañeros.",
      materials: "Libros de cuentos en diversos idiomas",
      evaluationProcess: "Rúbrica de selección y narración del cuento (claridad, uso del vocabulario, expresión)."
    },
    {
      name: "2. 'Mi Lengua, Mi Cultura'",
      description: "Cada niño trae una palabra o frase en su lengua materna y la comparte con sus compañeros, explicando su significado y la importancia cultural.",
      materials: "Tarjetas para escribir palabras",
      evaluationProcess: "Rúbrica de presentación (claridad, participación, respeto a los compañeros)."
    },
    {
      name: "3. 'Canciones del Mundo'",
      description: "Aprender canciones de diferentes culturas y realizar una presentación en clase. Los niños pueden bailar o hacer movimientos que acompañen la canción.",
      materials: "Reproductores de música, vídeos",
      evaluationProcess: "Rúbrica de participación en la canción (coordinación, ritmo, disfrute)."
    },
    {
      name: "4. 'El Árbol de los Idiomas'",
      description: "Crear un mural en forma de árbol donde cada niño coloque su palabra o frase en su lengua junto con su traducción en español.",
      materials: "Papel, tijeras, colores, pegamento",
      evaluationProcess: "Rúbrica de contribución al mural (creatividad, claridad en la escritura, respeto por las lenguas)."
    },
    {
      name: "5. 'El Bingo de las Lenguas'",
      description: "Jugar un bingo donde las palabras están en diferentes idiomas. Los niños deben escuchar y asociar correctamente las palabras con imágenes.",
      materials: "Tarjetas de bingo, marcadores",
      evaluationProcess: "Rúbrica de participación (escucha activa, reconocimiento de palabras)."
    }
  ],
  conclusion: "Este proyecto busca fomentar el reconocimiento y aprecio por la diversidad lingüística, involucrando a todos los niños en una serie de actividades que estimulan su curiosidad y respeto por diferentes lenguas y culturas."
};

@Component({
  selector: 'app-promt',
  standalone: true,
  templateUrl: './promt.component.html',
  styleUrls: ['./promt.component.scss']
})
export class PromtComponent {
  generatePdf() {
    const doc = new jsPDF();

    // Agregar el título del proyecto
    doc.setFontSize(18);
    doc.text(projectInfo.theme, 20, 20);

    // Agregar la información general del proyecto
    doc.setFontSize(14);
    doc.text(`Objetivo General: ${projectInfo.generalObjective}`, 20, 30);
    doc.text(`Duración: ${projectInfo.duration}`, 20, 40);
    doc.text(`Frecuencia de Evaluación: ${projectInfo.evaluationFrequency}`, 20, 50);

    // Crear una tabla de actividades directamente en el PDF
    const activitiesTableData = projectInfo.activities.map(activity => [
      activity.name,
      activity.description,
      activity.materials,
      activity.evaluationProcess
    ]);

    // Usar autoTable para agregar la tabla al PDF
    doc.autoTable({
      head: [['Actividad', 'Descripción', 'Materiales', 'Proceso de Evaluación']],
      body: activitiesTableData,
      startY: 60,
      theme: 'grid',
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'left' },
        2: { halign: 'left' },
        3: { halign: 'left' }
      }
    });

    // Agregar la conclusión
    doc.addPage();
    doc.setFontSize(14);
    doc.text(projectInfo.conclusion, 20, 20, { maxWidth: 170 });

    // Guardar el PDF
    doc.save('proyecto-diversidad-linguistica.pdf');
  }
}
