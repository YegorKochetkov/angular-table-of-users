import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      minWidth: 'fit-content',
    });
  }

  ngOnInit(): void {
  }

}
