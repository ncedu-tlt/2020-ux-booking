import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  formReview = this.fb.group({
    name: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    ],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ],
    secPassword: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ]
  });

  postRegistrationData() {
    // if (
    //   this.formReview.controls.password === this.formReview.controls.secPassword
    // )
    const body = {
      name: this.formReview.value.name,
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    console.log(body);
    return this.http.post('/api/users', body).subscribe(error => {
      if (error) {
        console.log('error');
        console.log(error);
      } else {
        console.log('redirect');
      }
    });
  }
}
