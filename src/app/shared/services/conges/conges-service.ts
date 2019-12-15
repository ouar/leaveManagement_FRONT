import { Conge } from './../../security/models/conge';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CongesService {
  private listConges: BehaviorSubject<Conge[]> = new BehaviorSubject([]);
  ArraylistConges = this.listConges.asObservable();
  private apiUrl = environment.apiUrl;
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {}

  findCongesCollaborater(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl + '/leaves');
  }
  addCongeCollaborateur(conge: Conge): Observable<Conge[]> {
    return this.http.post<Conge[]>(
      this.apiUrl + '/leaves',
      JSON.stringify(conge),
      this.httpOptions
    );
  }
  deleteCongeCollaborateur(idConge: number): Observable<Conge[]> {
    return this.http.delete<Conge[]>(
      this.apiUrl + '/leaves/' + idConge,
      this.httpOptions
    );
  }
  updateCongeCollaborateur(conge: Conge): Observable<Conge[]> {
    return this.http.put<Conge[]>(
      this.apiUrl + '/leaves/' + conge.id,
      JSON.stringify(conge),
      this.httpOptions
    );
  }

  initListConges(listConges: Array<Conge>) {
    this.listConges.next(listConges);
  }
  clearListConges() {
    this.listConges.next(null);
  }
}
