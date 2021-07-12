import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'b-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.less']
})
export class AddRoomFormComponent implements OnInit {
  isOpenConstructorForm = true;
  roomData = [
    {
      name: 'lorem',
      price: 45,
      count: 3,
      description: 'lorem',
      capacity: 5,
      beds: 4,
      photos: []
    }
  ];
  photos: File[] = [];
  amenitiesPhotos: File[] = [];
  typeRoomData = [];
  typeBadData = [];

  formRoom = new FormGroup({
    price: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999)
    ]),
    countRoom: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999999)
    ]),
    capacity: new FormControl(0, [
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
      price: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999999)
      ])
    });
    this.amenitiesInformation.push(amenitiesForm);
  }

  deleteConveniences(id): void {
    this.amenitiesInformation.removeAt(id);
    this.deleteamenitiesPhotos(id);
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
        price: data.value.price
      });
    }
    return amenitiesRoomArray;
  }

  setTypeRoomData($event): void {
    this.typeRoomData = $event;
    console.log();
  }

  getTypeRoomData(): string[] {
    return this.typeRoomData;
  }

  setTypeBadData($event): void {
    this.typeBadData = $event;
  }

  getTypeBadData(): string[] {
    return this.typeRoomData;
  }

  deletePhotos(id): void {
    this.photos.splice(this.photos.indexOf(id), 1);
  }

  deleteamenitiesPhotos(id): void {
    this.photos.splice(this.amenitiesPhotos.indexOf(id), 1);
  }

  remove(): void {
    if (this.isOpenConstructorForm) {
      this.isOpenConstructorForm = false;
    }
  }

  saveRoomInformation(): void {
    if (this.isOpenConstructorForm) {
      const roomData = {
        name: this.getTypeRoomData(),
        price: this.formRoom.value.price,
        count: this.formRoom.value.countRoom,
        description: this.formRoom.value.description,
        capacity: this.formRoom.value.capacity,
        beds: this.getTypeBadData(),
        photos: this.photos
      };
      // this.roomData.push(roomData);
    } else {
      // drop to back-end
    }
  }

  ngOnInit(): void {
    this.addNewConveniences();
    this.addNewPhotos();
  }
}
