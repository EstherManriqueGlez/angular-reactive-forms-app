import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent {
  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue],
  });


  onSubmit(): void {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
