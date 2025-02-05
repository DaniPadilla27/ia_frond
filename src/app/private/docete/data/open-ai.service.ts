import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import OpenAI from 'openai';
import { environment } from '../../../../environments/environment';

interface ApiKeyResponse {
  api_key: string;
  organizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = `${environment.api}/token/api-keys/openai`;
  private openAIClient!: OpenAI;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la API Key y la organización desde el backend
   */
  private fetchApiKey(): Observable<ApiKeyResponse> {
    return this.http.get<ApiKeyResponse[]>(this.apiUrl).pipe(
      map(keys => keys.length > 0 ? keys[0] : { api_key: '', organizacion: '' }),
      catchError(error => {
        console.error('Error obteniendo la API Key:', error);
        return throwError(() => new Error('No se pudo obtener la API Key'));
      })
    );
  }

  /**
   * Inicializa el cliente de OpenAI con la clave obtenida
   */
  initializeClient(): Observable<void> {
    return this.fetchApiKey().pipe(
      map(apiData => {
        // console.log(apiData.api_key)
        if (apiData.api_key) {
          this.openAIClient = new OpenAI({
            apiKey: apiData.api_key,
            organization: apiData.organizacion,            dangerouslyAllowBrowser: true,

          });
        } else {
          throw new Error('Clave de API no válida');
        }
      })
    );
  }

  /**
   * Realiza una consulta al asistente de OpenAI con un contexto educativo
   */
  consultaAsistente(pregunta: string, contextoEscuela: string): Observable<string> {
    return this.initializeClient().pipe(
      switchMap(() => this.openAIClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: contextoEscuela },
          { role: 'user', content: pregunta },
          {
            role: "assistant",
            content: "Actúa como un experto pedagogo estratégico para generar un reporte general de diagnóstico lo más detallado posible. Desglosa las actividades, destacando la generación de un informe profesional que identifique áreas clave en el proceso de enseñanza-aprendizaje. El reporte debe contener información contextualizada a la realidad de los estudiantes, incluyendo el análisis de sus necesidades, fortalezas y áreas de mejora. Utiliza tablas, encabezados y otros elementos visuales como gráficos o listas para facilitar la presentación y comprensión del reporte. Devuelve únicamente la respuesta en formato HTML, asegurándote de que esté bien estructurada, clara y profesional. No introduzcas texto adicional."
          }
          
          // { role: "assistant", content: "Actúa como un experto pedagogo estratégico para generar un reporte general de diagnóstico lo más detallado posible que contenga información que posteriormente ayude a desarrollar estrategias de enseñanza-aprendizaje pertinentes y contextualizadas a la realidad de los estudiantes. Devuelve únicamente la respuesta en formato HTML, asegurándote de que esté bien estructurada con tablas, encabezados y otros elementos visuales según sea necesario para una presentación adecuada y comprensible. No introduzcas texto adicional." }

          // { role: "assistant", content: "Actúa como un experto pedagogo estratégico para generar un reporte general de diagnóstico lo más detallado posible que contenga información que posteriormente ayude a desarrollar estrategias de enseñanza aprendizaje pertinentes y contextualizadas a la realidad de los estudiantes.  y dame en formato html  la respuesta " }
          // { role: "assistant", content: "Actúa como un experto pedagogo estratégico para generar un reporte general de diagnóstico lo más detallado posible que contenga información que posteriormente ayude a desarrollar estrategias de enseñanza-aprendizaje pertinentes y contextualizadas a la realidad de los estudiantes. Devuelve únicamente la respuesta en formato HTML, sin introducir texto adicional." }
        ]

        // Actúa como un experto pedagogo estratégico para generar un reporte general de diagnóstico lo más detallado posible que contenga información que posteriormente ayude a desarrollar estrategias de enseñanza aprendizaje pertinentes y contextualizadas a la realidad de los estudiantes. Devuelve la respuesta en formato HTML.
        // 

      })),
      map(response => {
        // Extraer información de la respuesta
        const mensaje = response.choices[0]?.message?.content ?? 'Respuesta no disponible';
        const totalTokens = response.usage?.total_tokens ?? 0;
  
        // Calcular el costo aproximado
        const costPerThousandTokensUSD = 0.06; // Costo por 1000 tokens en USD
        const exchangeRate = 20; // Tipo de cambio USD -> MXN
        const costInUSD = (totalTokens / 1000) * costPerThousandTokensUSD;
        const costInMXN = costInUSD * exchangeRate;
  
        // Log para depuración
        // console.log("Respuesta del asistente:", mensaje);
        console.log("Tokens utilizados:", totalTokens);
        console.log("Costo en pesos mexicanos:", costInMXN.toFixed(2));
  
        return mensaje; // Mantiene el retorno como string
      }),
      catchError(error => {
        console.error('Error en la consulta a OpenAI:', error);
        return throwError(() => new Error('Error al procesar la consulta'));
      })
    );
  }
  
}