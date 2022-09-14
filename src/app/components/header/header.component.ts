import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user = this.route.snapshot.paramMap.has('id');
  id: Observable<string> | undefined;


  constructor(
    private dialog: MatDialog,
    protected router: Router,
    private route: ActivatedRoute
  ) {
    this.id = route.params.pipe(
      map((p) => p['id'])
    );
  //   route.queryParams.subscribe(p => console.log(p['id']));
  //   router.events.subscribe((val) => {
  //     // see also
  //     console.log(val instanceof NavigationEnd)
  // });
  }

  ngOnInit(): void {  console.log(this.id)}

  openDialog() {
    this.dialog.open(DialogComponent, {
      minWidth: 'fit-content',
    });
  }

  openEditDialog() {
    this.dialog.open(DialogComponent, {
      minWidth: 'fit-content',
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
