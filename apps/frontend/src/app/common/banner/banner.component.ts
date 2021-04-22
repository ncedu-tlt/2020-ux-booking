import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'b-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements AfterViewInit, OnInit {
  @ViewChild('description') elementDescription: ElementRef;

  @ViewChild('scroll') elementScroll: ElementRef;

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

  descriptionText = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.elementDescription.nativeElement.innerText = this.hotelInfo.description;
    this.blockReSizing();
  }

  ngOnInit() {
    this.descriptionText = this.hotelInfo.description;
  }

  ngAfterViewInit() {
    this.blockReSizing();
  }

  public blockReSizing(): void {
    while (this.elementDescription.nativeElement.offsetHeight > 74) {
      this.elementDescription.nativeElement.innerText = this.elementDescription.nativeElement.innerText.slice(
        0,
        -1
      );
    }
    this.descriptionText = this.hotelInfo.description;
  }

  scrollLeft() {
    this.elementScroll.nativeElement.scrollLeft += 200;
  }

  scrollRight() {
    this.elementScroll.nativeElement.scrollLeft -= 200;
  }
}
