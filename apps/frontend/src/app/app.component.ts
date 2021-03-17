import { Component } from '@angular/core';
import { Data } from '@booking/models/data.model';

@Component({
  selector: 'booking-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'frontend';
  data: Data = {
    message: 'test'
  }
}
