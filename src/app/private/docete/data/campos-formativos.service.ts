import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CamposFormativosService {
  private jsonUrl = 'assets/campos-formativos.json';
  private jsonUrl2 = 'assets/procesos_desarrollo_aprendizaje.json'; // Ruta del nuevo JSON
  private jsonUrl3 = 'assets/periodos.json'; // Ruta del nuevo JSON

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  /**
     * Obtiene los datos filtrados por id_categoria e id_subtema
     */
  getSubtemaById(id_categoria: number, id_subtema: number): Observable<any> {
    return this.http.get<any>(this.jsonUrl2).pipe(
      map(data => {
        return data.procesos_desarrollo_aprendizaje.find((subtema: any) =>
          subtema.id_categoria === id_categoria && subtema.id_subtema === id_subtema
        ) || null;
      })
    );
  }


  /**
 * Obtiene los periodos de trabajo desde el JSON.
 */
getPeriodos(): Observable<any> {
  return this.http.get<any>(this.jsonUrl3).pipe(
    map(data => data.opciones) // Retorna solo la lista de opciones de periodicidad
  );
}


obtenerDetallesPorSubtema(nombreSubtema: string): Observable<{ 
  categoriaId: number, 
  subtemaId: number, 
  descripcion: string 
} | null> {
  return this.getCategorias().pipe(
    map(data => {
      if (!data || !data.categorias) return null;

      for (let categoria of data.categorias) {
        const subtemaEncontrado = categoria.subtemas.find((sub: any) => sub.nombre === nombreSubtema);
        if (subtemaEncontrado) {
          return { 
            categoriaId: categoria.id, 
            subtemaId: subtemaEncontrado.id,
            descripcion: subtemaEncontrado.descripcion 
          };
        }
      }
      return null; // Si no se encuentra el subtema
    })
  );
}


}
