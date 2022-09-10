import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-table-of-users';

  constructor(
    private dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '33%'
    });
  }
}
