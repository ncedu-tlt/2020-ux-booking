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
  hotelsInfo: HotelInfoModel[] = [
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel.jpg',
      description:
        'первый, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    },
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel1.jpg',
      description:
        'второй, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    },
    {
      name: 'Hotel super puper ',
      hotelImgUrl: 'assets/icons/hotel2.jpg',
      description:
        'третий, eos elmet, consectetur adipisicing eos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuseos elmet, consectetur adipisicing elit. ' +
        'Adipisci animi commodi cum debitis delectuselit. Adipisci animi commodi cum debitis ' +
        'delectus dolore doloremque, eos e',
      address: {
        country: 'russia',
        city: 'moscow'
      },
      starsCount: 1,
      countReviews: 10,
      hotelRating: 9.6,
      minPrice: 2300,
      currency: '$',
      freeCancellation: true,
      services: [
        {
          name: 'car',
          iconUrl: 'assets/icons/car.svg'
        },
        {
          name: 'dryer',
          iconUrl: 'assets/icons/dryer.svg'
        }
      ]
    }
  ];

  selectedHotel: HotelInfoModel;

  descriptionText = '';

  subscription: Subscription = new Subscription();

  hotelsList: HotelInfoModel[];

  readonly lengthScroll = 200;

  @ViewChild('description') elementDescription: ElementRef;

  @ViewChild('scroll') elementScroll: ElementRef;

  constructor(private hotelService: HotelDataService) {}

  ngOnInit(): void {
    this.subscription = this.hotelService
      .getHotels()
      .subscribe((hotels: HotelInfoModel[]) => {
        this.hotelsList = hotels;
      });
    this.selectedHotel = this.hotelsInfo[0];
    this.descriptionText = this.selectedHotel.description;
  }

  ngAfterViewInit(): void {
    this.truncateText();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.elementDescription.nativeElement.innerText = this.selectedHotel.description;
    this.truncateText();
  }

  selectHotel(index: number): void {
    this.selectedHotel = this.hotelsInfo[index];
    this.elementDescription.nativeElement.innerText = this.selectedHotel.description;
    this.truncateText();
  }

  truncateText(): void {
    while (this.elementDescription.nativeElement.offsetHeight > 70) {
      this.elementDescription.nativeElement.innerText = this.elementDescription.nativeElement.innerText.slice(
        0,
        -35
      );
    }
    this.elementDescription.nativeElement.append('...');
  }

  scrollLeft(): void {
    this.elementScroll.nativeElement.scrollLeft += this.lengthScroll;
  }

  scrollRight(): void {
    this.elementScroll.nativeElement.scrollLeft -= this.lengthScroll;
  }
}
