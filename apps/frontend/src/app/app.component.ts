import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'b-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoginPage = false;
  currentUrl: string;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.currentUrl = this.location.path();
    this.isLoginPage = !(
      this.location.path() === '/registration' ||
      this.location.path() === '/authorization'
    );
  }
}
