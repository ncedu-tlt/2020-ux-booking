import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HotelDataService } from '../../services/hotel-data.service';

@Component({
  selector: 'b-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.less']
})
export class AddRoomFormComponent implements OnInit {
  isConstructorFormOpened = false;
  roomData = [];
  photos: File[] = [];
  amenitiesPhotos: File[] = [];
  typeRoomData: string[];
  typeBadData: string[];
  id: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private HotelDataService: HotelDataService
  ) {}

  formRoom = new FormGroup({
    price: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999)
    ]),
    countRoom: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999)
    ]),
    capacity: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999)
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(30),
      Validators.maxLength(3000)
    ])
  });

  amenitiesRoomArray = new FormGroup({
    amenitiesInformation: new FormArray([])
  });

  get amenitiesInformation(): FormArray {
    return this.amenitiesRoomArray.controls[
      'amenitiesInformation'
    ] as FormArray;
  }

  addNewConveniences(): void {
    const amenitiesForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(3000)
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999999)
      ])
    });
    this.amenitiesInformation.push(amenitiesForm);
  }

  deleteConveniences(id): void {
    this.amenitiesInformation.removeAt(id);
    this.deleteAmenitiesPhotos(id);
  }

  openForm(): void {
    this.isConstructorFormOpened = true;
  }

  setIcon(image: File): void {
    this.amenitiesPhotos.push(image);
  }

  setSoloIcon(image: File): void {
    this.photos.push(image);
    console.log(this.photos);
  }

  addNewPhotos(): void {
    this.photos.push(this.photos[0]);
  }

  get amenitiesRoomData() {
    const amenitiesRoomArray = [];
    for (const data of this.amenitiesInformation.controls) {
      amenitiesRoomArray.push({
        name: data.value.name,
        price: data.value.price,
        icon: undefined
      });
    }
    for (let i = 0; i < amenitiesRoomArray.length; i++) {
      amenitiesRoomArray[i].icon = this.amenitiesPhotos[i];
    }
    return amenitiesRoomArray;
  }

  setTypeRoomData(typeRoom: string[]): void {
    this.typeRoomData = typeRoom;
  }

  getTypeRoomData(): string[] {
    return this.typeRoomData;
  }

  setTypeBadData(typeBad: string[]): void {
    this.typeBadData = typeBad;
  }

  getTypeBadData(): string[] {
    return this.typeBadData;
  }

  deletePhotos(id): void {
    this.photos.splice(this.photos.indexOf(id), 1);
  }

  deleteAmenitiesPhotos(id): void {
    this.amenitiesPhotos.splice(this.amenitiesPhotos.indexOf(id), 1);
  }

  remove(): void {
    if (this.isConstructorFormOpened) {
      this.isConstructorFormOpened = false;
    }
  }

  saveRoomInformation() {
    const API_URL = '/api/hotels/1cdd3f84-188e-4fbe-9e98-ee1cd186930c/rooms';
    if (this.isConstructorFormOpened) {
      const roomData = {
        name: this.getTypeRoomData()[0],
        price: this.formRoom.value.price,
        count: this.formRoom.value.countRoom,
        description: this.formRoom.value.description,
        capacity: this.formRoom.value.capacity,
        beds: this.getTypeBadData(),
        amenities: this.amenitiesRoomData,
        photos: this.photos
      };
      this.roomData.push(roomData);
      this.isConstructorFormOpened = false;
    } else {
      this.HotelDataService.postHotelRooms(API_URL, this.roomData).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params?.id || '';
    });
    this.addNewConveniences();
    this.addNewPhotos();
  }
}
