import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { ApiService } from 'src/app/services/users.service';
import { UserInterface } from 'src/app/types/user.type';

interface DialogData {
  user: UserInterface,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  addNewUser: FormGroup;
  buttonActionText: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editableData: DialogData
  ) {
    this.addNewUser = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        )
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(
          /^(\+\d{1,3})?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/
        )
      ]],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: ['']
      }),
    })
  }

  ngOnInit(): void {
    if (this.editableData) {
      this.buttonActionText = 'Update';

      this.addNewUser.controls['fullname']
        .setValue(this.editableData.user.fullname);
      this.addNewUser.controls['email']
        .setValue(this.editableData.user.email);
      this.addNewUser.controls['phone']
        .setValue(this.editableData.user.phone);

      this.addNewUser.controls['address'].get('street')
        ?.setValue(this.editableData.user.address.street);
      this.addNewUser.controls['address'].get('city')
        ?.setValue(this.editableData.user.address.city);
      this.addNewUser.controls['address'].get('state')
        ?.setValue(this.editableData.user.address.state);
      this.addNewUser.controls['address'].get('country')
        ?.setValue(this.editableData.user.address.country);
    }
  }

  submit() {
    if (this.editableData) {
      this.api.updateUser(
        this.addNewUser.value,
        this.api.currentUser$.getValue()!.id
      );
    } else {
      this.api.addUser(this.addNewUser.value)
    }
  }
}
