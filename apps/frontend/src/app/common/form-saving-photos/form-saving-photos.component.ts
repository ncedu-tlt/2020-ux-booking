import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelDataService } from '../../services/hotel-data.service';
import { Subscription } from 'rxjs';
import { HotelDto } from '@booking/models/hotel.dto';

@Component({
  selector: 'b-form-saving-photos',
  templateUrl: './form-saving-photos.component.html',
  styleUrls: ['./form-saving-photos.component.less']
})
export class FormSavingPhotosComponent implements OnInit {
  mainPhoto: File = null;

  minorPhotos: File[] = [];

  viewFileSelectorToMinorPhotos: number[] = [1];

  subscription: Subscription = new Subscription();

  dataPhotos: any[];

  data: HotelDto;

  id = '8780bdcf-28bb-4828-8d91-a6fb7effed01';

  constructor(
    private http: HttpClient,
    private dataService: HotelDataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService
      .getHotel(this.id)
      .subscribe((hotel: HotelDto) => {
        this.data = hotel;
        this.dataPhotos = this.data.photos;

        this.dataPhotos = this.dataPhotos.filter(
          value => value.id != this.data.mainPhoto.id
        );
        console.log(this.dataPhotos);
      });
  }

  addMainPhoto(event): void {
    console.log(event.target.files[0]);
    this.mainPhoto = <File>event.target.files[0];
  }

  addMinorPhoto(event): void {
    console.log(event.target.files[0]);
    this.minorPhotos.push(event.target.files[0]);
    console.log(this.minorPhotos);
  }

  createAddField(): void {
    this.viewFileSelectorToMinorPhotos.push(1);
    console.log(this.data);
  }

  upload(): void {
    const formData = new FormData();
    if (this.mainPhoto != null) {
      formData.append('mainImg', this.mainPhoto, this.mainPhoto.name);
    }
    if (this.minorPhotos.length > 0) {
      this.minorPhotos.forEach(photo => {
        formData.append('img', photo, photo.name);
      });
    }
    this.http
      .patch(
        'http://localhost:3333/api/hotels/' + this.id + '/photos',
        formData
      )
      .subscribe((res: any) => {
        this.data.mainPhoto = res.mainPhoto;
        this.dataPhotos = res.photos.filter(
          value => value.id != this.data.mainPhoto.id
        );
        console.log(this.data.photos);
      });
    this.mainPhoto = null;
    this.minorPhotos = [];
    this.viewFileSelectorToMinorPhotos = [1];
  }

  deletePhoto(id) {
    this.http
      .delete('http://localhost:3333/api/hotels/' + this.id + '/photos/' + id)
      .subscribe((res: any) => {
        console.log(res);
        this.data.mainPhoto = res.mainPhoto;

        this.dataPhotos = res.photos.filter(
          value => value.id != this.data.mainPhoto.id
        );
        console.log(this.data.photos);
      });
  }

  deleteField(i: number) {
    if (this.viewFileSelectorToMinorPhotos.length > 1) {
      this.viewFileSelectorToMinorPhotos.pop();
    }

    this.minorPhotos.splice(i, 1);
  }
}
