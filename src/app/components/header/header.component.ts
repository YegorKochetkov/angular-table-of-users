import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    protected router: Router,
  ) {}

  ngOnInit(): void {}

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
