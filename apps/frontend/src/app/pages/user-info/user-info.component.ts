import { Component, Input, OnInit } from '@angular/core';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../../services/user-data.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'b-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
  editable = false;

  isNotificationVisible = false;

  buttonIconTypesEnum: typeof ButtonIconTypesEnum = ButtonIconTypesEnum;

  initState: UserModel;

  userId: string;

  userInfoForm = this.formBuilder.group({
    lastName: ['', [Validators.minLength(2), Validators.maxLength(255)]],
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)]
    ],
    dateOfBirth: ['', []],
    nationality: ['', [Validators.minLength(2), Validators.maxLength(255)]],
    gender: ['', [Validators.minLength(1), Validators.maxLength(32)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.minLength(11), Validators.maxLength(11)]]
  });

  constructor(
    private userDataService: UserDataService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getUserId().subscribe(userId => {
      this.userId = userId;
      this.userDataService.getUser(userId).subscribe(user => {
        this.userInfoForm.patchValue(user);
        this.initState = user;
      });
    });
  }

  onEditClick() {
    this.editable = true;
  }

  save() {
    this.editable = false;
    this.initState = this.userInfoForm.getRawValue();

    this.userDataService
      .updateUserInfo({
        id: this.userId,
        ...this.userInfoForm.getRawValue()
      })
      .subscribe(
        r => {
          this.isNotificationVisible = true;
        },
        error => close()
      );
  }

  cancel() {
    this.userInfoForm.reset(this.initState);
    this.editable = false;
  }
}
