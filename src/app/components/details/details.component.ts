import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/services/users.service';
import { UserInterface } from 'src/app/types/user.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user: UserInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.api.getUser(id)
      .subscribe({
        next: (user) => {
          this.user = user;
          this.api.currentUser.next(user);
        },
        error: (error) => {
          console.error('error while fetching users: ', error.message)
        }
      });
  }
}
