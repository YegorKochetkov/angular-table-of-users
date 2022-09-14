import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  addNewUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
    this.addNewUser = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern(
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        )
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(
          /^(\+38)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/
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

  ngOnInit(): void {}

  submit() {
    this.api.addUser(this.addNewUser.value)
      .subscribe({
        next: (result) => {
          console.log('user added!')
        },
        error: (error) => {
          console.error('error while adding a user: ', error.message)
        }
      })
  }
}
