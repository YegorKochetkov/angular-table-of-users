import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseURL = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  addUser(user: UserInterface) {
    return this.http.post<UserInterface>(this.baseURL, user);
  }

  getUsers() {
    return this.http.get<UserInterface[]>(this.baseURL);
  }

  getUser(id: number) {
    return this.http.get<UserInterface>(this.baseURL + id);
  }
}
