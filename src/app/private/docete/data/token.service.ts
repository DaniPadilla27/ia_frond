import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {}


  private apiUrl = `${environment.api}/token/api-keys/openai`;


  getApiKey(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
