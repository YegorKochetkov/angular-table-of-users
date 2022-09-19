import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UserInterface } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseURL = 'http://localhost:3000/users/';

  usersList$ = new BehaviorSubject<UserInterface[]>([]);
  currentUser$ = new BehaviorSubject<UserInterface | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  addUser(user: UserInterface): void {
    this.http.post<UserInterface>(this.baseURL, user)
      .subscribe(() => this.getUsers()
    );
  }

  deleteUser(id: number): void {
    this.http.delete<UserInterface>(this.baseURL + id)
      .subscribe(() => this.getUsers()
    );
  }

  updateUser(user: UserInterface, id: number): void {
    this.http.put<UserInterface>(this.baseURL + id, user)
      .subscribe(() => {
        this.getUser(id);
      }
    );
  }

  getUsers(): void {
    this.loading$.next(true);
    this.http.get<UserInterface[]>(this.baseURL)
      .subscribe((userList) => {
        this.usersList$.next(userList);
        this.loading$.next(false);
      }
    );
  }

  getUser(id: number): void {
    this.loading$.next(true);
    this.http.get<UserInterface>(this.baseURL + id)
      .subscribe((user) => {
        this.currentUser$.next(user);
        this.loading$.next(false);
      }
    );
  }
}
