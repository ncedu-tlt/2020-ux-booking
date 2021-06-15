import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'b-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  formReview = this.fb.group({
    name: [
      null,
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    ],
    email: [
      null,
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    password: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ],
    repeatedPassword: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(255)]
    ]
  });

  // receivedUser
  postRegistrationData() {
    const body = {
      name: this.formReview.value.name,
      email: this.formReview.value.email,
      password: this.formReview.value.password
    };
    return this.http.post('/api/users', body).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/authorization']).then(r => r);
      },
      error => {
        // console.log(error);
        console.log(error.status);
        console.log(error.statusText);
      }
    );
  }
}
