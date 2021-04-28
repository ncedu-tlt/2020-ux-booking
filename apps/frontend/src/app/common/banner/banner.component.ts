import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { HotelInfoModel } from '../../models/hotel-Info.model';
import { HotelDataService } from '../../services/hotel-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'b-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements AfterViewInit, OnInit {
  selectedHotel: HotelInfoModel;

  descriptionText = '';

  subscription: Subscription = new Subscription();

  hotelsList: HotelInfoModel[];

  private readonly LENGTH_SCROLL: number = 200;

  private readonly LENGTH_DESCRIPTION: number = 70;

  @ViewChild('description') elementDescription: ElementRef;

  @ViewChild('scroll') elementScroll: ElementRef;

  constructor(private hotelService: HotelDataService) {}

  ngOnInit(): void {
    this.subscription = this.hotelService
      .getHotels()
      .subscribe((hotels: HotelInfoModel[]) => {
        this.hotelsList = hotels;
      });

    this.selectedHotel = this.hotelsList[0];
    this.descriptionText = this.selectedHotel.description;
  }

  ngAfterViewInit(): void {
    this.truncateText();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.elementDescription.nativeElement.innerText = this.selectedHotel.description;
    this.truncateText();
  }

  selectHotel(index: number): void {
    this.selectedHotel = this.hotelsList[index];
    this.elementDescription.nativeElement.innerText = this.selectedHotel.description;
    this.truncateText();
  }

  truncateText(): void {
    while (
      this.elementDescription.nativeElement.offsetHeight >
      this.LENGTH_DESCRIPTION
    ) {
      this.elementDescription.nativeElement.innerText = this.elementDescription.nativeElement.innerText.slice(
        0,
        -35
      );
    }
    this.elementDescription.nativeElement.append('...');
  }

  scrollLeft(): void {
    this.elementScroll.nativeElement.scrollLeft += this.LENGTH_SCROLL;
  }

  scrollRight(): void {
    this.elementScroll.nativeElement.scrollLeft -= this.LENGTH_SCROLL;
  }
}
