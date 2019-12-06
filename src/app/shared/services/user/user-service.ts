import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { User } from './../../security/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private listUser: BehaviorSubject<User[]> = new BehaviorSubject([]);
  ArraylistUser = this.listUser.asObservable();
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  initListUser(listUser: Array<User>) {
    this.listUser.next(listUser);
  }
  clearListUsers() {
    this.listUser.next(null);
  }
}
