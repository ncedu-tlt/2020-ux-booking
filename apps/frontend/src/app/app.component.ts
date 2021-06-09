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

  constructor(private location: Location) {
    this.isLoginPage =
      location.path() === '/registration' ||
      location.path() === '/authorization';
  }

  ngOnInit(): void {
    this.currentUrl = this.location.path();
  }
}
