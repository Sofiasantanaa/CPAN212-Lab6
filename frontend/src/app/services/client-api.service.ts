import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientApiService {
  private baseUrl = '/api/clients';

  constructor(private http: HttpClient) {}

  list(filters?: { riskCategory?: string; q?: string }): Observable<Client[]> {
    let params = new HttpParams();
    if (filters?.riskCategory) params = params.set('riskCategory', filters.riskCategory);
    if (filters?.q) params = params.set('q', filters.q);
    return this.http.get<Client[]>(this.baseUrl, { params });
  }

  get(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  create(payload: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Client>): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
