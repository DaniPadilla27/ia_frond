import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private apiUrl1 = `${environment.api}/api/diagnostico1`;
  private apiUrl2 =`${environment.api}/api/diagnostico2`;

  constructor(private http: HttpClient) {}

  getDiagnostico1(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl1}/${id}`);
  }

  getDiagnostico2(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${id}`);
  }
}
