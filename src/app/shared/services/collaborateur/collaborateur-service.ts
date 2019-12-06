import { Collaborateur } from './../../security/models/collaborateur';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Collaboraterervice {

  private listCollaborater: BehaviorSubject<Collaborateur[]> = new BehaviorSubject([]);
  ArraylistCollaborater = this.listCollaborater.asObservable();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findCollaborater(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(this.apiUrl + '/collabs');
  }

  initListCollaborater(listCollaborater: Array<Collaborateur>) {
    this.listCollaborater.next(listCollaborater);
  }
  clearListCollaboraters() {
    this.listCollaborater.next(null);
  }
}
