import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { User } from './../../security/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }
  delete(id: number) {
    return this.http.delete(this.apiUrl + '/users/${id}');
  }
}
