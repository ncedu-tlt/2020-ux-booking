import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'b-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements AfterViewInit {
  @ViewChild('description') el: ElementRef;

  @Input()
  hotelInfo;

  imageHotel = '';

  imagesHotels = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27
  ];

  /*this.el.nativeElement.innerText = '123123123';*/

  /*let descriptionHotel1 = this.hotelInfo.description.slice(0, -1);

  this.descriptionHotel = descriptionHotel1;*/

  ngAfterViewInit() {
    this.blockReSizing();
  }

  public blockReSizing(): void {
    while (this.el.nativeElement.offsetHeight > 74) {
      this.el.nativeElement.innerText = this.el.nativeElement.innerText.slice(
        0,
        -1
      );
      /*const description = this.el.nativeElement.textContent;*/
    }
    /*this.el.nativeElement.innerText = description + '...';*/
  }

  /*onResize(): void {
    this.blockReSizing();
    console.log(this.el.nativeElement.textContent);
  }*/
}
