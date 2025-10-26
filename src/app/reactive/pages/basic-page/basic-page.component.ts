import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent {
  // Using FormGroup and FormControl
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // Using FormBuilder Better Approach
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave() {
    console.log({'Guardando...': this.myForm.value});
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
