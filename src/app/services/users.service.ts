import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserInterface } from 'src/app/types/user.type';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  usersList$ = new BehaviorSubject<UserInterface[]>([]);
  currentUser$ = new BehaviorSubject<UserInterface | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  addUser(user: UserInterface): void {
    this.loading$.next(true);
    this.http.post<UserInterface>(apiURL, user)
      .subscribe(() => this.getUsers());
  }

  deleteUser(id: number): void {
    this.loading$.next(true);
    this.http.delete<UserInterface>(apiURL + id)
      .subscribe(() => {
        const updatedUsersList = this.usersList$
          .getValue()
          .filter((user) => user.id !== id);

        this.usersList$.next(updatedUsersList);
        this.loading$.next(false);
      }
    );
  }

  updateUser(user: UserInterface, id: number): void {
    this.loading$.next(true);
    this.http.put<UserInterface>(apiURL + id, user)
      .subscribe(() => {
        this.getUser(id);
      }
    );
  }

  getUsers(): void {
    this.loading$.next(true);
    this.http.get<UserInterface[]>(apiURL)
      .subscribe((userList) => {
        this.usersList$.next(userList);
        this.loading$.next(false);
      }
    );
  }

  getUser(id: number): void {
    this.loading$.next(true);
    this.http.get<UserInterface>(apiURL + id)
      .subscribe((user) => {
        this.currentUser$.next(user);
        this.loading$.next(false);
      }
    );
  }
}
