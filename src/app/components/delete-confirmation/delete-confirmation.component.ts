import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs';

import { ApiService } from 'src/app/services/users.service';

interface DialogData {
  id: number,
}

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})

export class DeleteConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: ApiService
  ) {}

  ngOnInit(): void {}

  deleteUser(id: number) {
    this.api.deleteUser(id);
  }
}
