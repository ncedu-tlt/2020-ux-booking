import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.less']
})
export class AddRoomFormComponent implements OnInit {
  isOpenConstructorForm = false;
  roomData = [];
  photos: File[] = [];
  amenitiesPhotos: File[] = [];
  typeRoomData;
  typeBadData = [];
  id: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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

  get amenitiesInformation() {
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
    this.isOpenConstructorForm = true;
  }

  setIcon(image): void {
    this.amenitiesPhotos.push(image);
  }

  setSoloIcon(image) {
    this.photos.push(image);
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

  setTypeRoomData($event): void {
    this.typeRoomData = $event;
  }

  getTypeRoomData(): string {
    return this.typeRoomData;
  }

  setTypeBadData($event): void {
    this.typeBadData = $event;
  }

  getTypeBadData(): number {
    return this.typeRoomData;
  }

  deletePhotos(id): void {
    this.photos.splice(this.photos.indexOf(id), 1);
  }

  deleteAmenitiesPhotos(id): void {
    this.photos.splice(this.amenitiesPhotos.indexOf(id), 1);
  }

  remove(): void {
    if (this.isOpenConstructorForm) {
      this.isOpenConstructorForm = false;
    }
  }

  saveRoomInformation() {
    // const API_URL = '/api:' + this.id + '/room';
    const API_URL = '/api/hotels/:' + 1 + '/room';
    if (this.isOpenConstructorForm) {
      const roomData = {
        name: this.getTypeRoomData(),
        price: this.formRoom.value.price,
        count: this.formRoom.value.countRoom,
        description: this.formRoom.value.description,
        capacity: this.formRoom.value.capacity,
        beds: this.getTypeBadData(),
        amenities: this.amenitiesRoomData,
        photos: this.photos
      };
      this.roomData.push(roomData);
      this.isOpenConstructorForm = false;
    } else {
      return this.http.post(API_URL, this.roomData).subscribe(
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
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    console.log(this.id);

    this.addNewConveniences();
    this.addNewPhotos();
  }
}
