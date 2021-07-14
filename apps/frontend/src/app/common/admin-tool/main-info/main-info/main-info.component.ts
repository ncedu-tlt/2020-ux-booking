import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.less']
})
export class MainInfoComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params?.id || '';
    });
  }
}
