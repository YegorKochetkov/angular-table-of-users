import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/users.service';
import { UserInterface } from 'src/app/types/user.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: UserInterface | null | undefined;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    this.api.loading$.subscribe((isLoading) => this.loading = isLoading);
    this.api.currentUser$.subscribe((user) => this.user = user);
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.api.currentUser$.next(null);
  }

  getUser(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    if (isNaN(id)) {
      this.router.navigate(['404']);
    }

    this.api.getUser(id);
  }
}
