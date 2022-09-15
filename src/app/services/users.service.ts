import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { UserInterface } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseURL = 'http://localhost:3000/users/';
  currentUser = new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) { }

  addUser(user: UserInterface) {
    return this.http.post<UserInterface>(this.baseURL, user);
  }

  updateUser(user: UserInterface) {
    return this.http.put<UserInterface>(this.baseURL + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<UserInterface>(this.baseURL + id);
  }

  getUsers() {
    return this.http.get<UserInterface[]>(this.baseURL);
  }

  getUser(id: number) {
    return this.http.get<UserInterface>(this.baseURL + id);
  }
}
