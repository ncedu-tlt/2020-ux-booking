import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelDataService } from '../../services/hotel-data.service';
import { Subscription } from 'rxjs';
import { HotelDto } from '@booking/models/hotel.dto';
import { ActivatedRoute } from '@angular/router';

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

  id: string;

  constructor(
    private http: HttpClient,
    private dataService: HotelDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params?.id || '';
      this.subscription = this.dataService
        .getHotel(this.id)
        .subscribe((hotel: HotelDto) => {
          this.data = hotel;
          this.dataPhotos = this.data.photos;

          this.dataPhotos = this.dataPhotos.filter(
            value => value.id != this.data.mainPhoto.id
          );
        });
    });
  }

  addMainPhoto(event): void {
    this.mainPhoto = <File>event.target.files[0];
  }

  addMinorPhoto(event): void {
    this.minorPhotos.push(event.target.files[0]);
  }

  createAddField(): void {
    this.viewFileSelectorToMinorPhotos.push(1);
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
