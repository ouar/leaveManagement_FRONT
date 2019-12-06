import { Conge } from './../../security/models/conge';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CongesService {
  private listConges: BehaviorSubject<Conge[]> = new BehaviorSubject([]);
  ArraylistConges = this.listConges.asObservable();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findCongesCollaborater(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl + '/leaves');
  }

  initListConges(listConges: Array<Conge>) {
    this.listConges.next(listConges);
  }
  clearListConges() {
    this.listConges.next(null);
  }
}
