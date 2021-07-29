import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelDataService } from '../../services/hotel-data.service';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

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
  typeBadData = [];
  id: string;
  roomObject;
  isDetectError = false;
  NotificationTypesEnum: typeof NotificationTypesEnum = NotificationTypesEnum;
  errorMessage: string;

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
    if (this.photos[0] === undefined) {
      delete this.photos[0];
    }
    this.photos.push(image);
  }

  addNewPhotos(): void {
    this.photos.push(this.photos[0]);
  }

  get amenitiesRoomData() {
    const amenitiesRoomArray = [];
    this.amenitiesInformation.controls.forEach((item, i) => {
      amenitiesRoomArray.push({
        name: item.value.name,
        price: item.value.price,
        icon: this.amenitiesPhotos[i]
      });
    });
    return amenitiesRoomArray;
  }

  setTypeRoomData(typeRoom: string[]): void {
    this.typeRoomData = typeRoom;
  }

  getTypeRoomData(): string[] {
    return this.typeRoomData;
  }

  setTypeBadData(typeBad: string[]): void {
    for (const bed of typeBad) {
      this.typeBadData.push({ name: bed });
    }
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

  showError(errorMessage: string): void {
    this.isDetectError = true;
    if (errorMessage === 'Unauthorized') {
      this.errorMessage = this.i18NextService.t(
        'authorization.errorMessage.unauthorized'
      );
    } else {
      this.errorMessage = this.i18NextService.t(
        'authorization.errorMessage.default'
      );
    }
  }

  closeNotification(): void {
    this.isDetectError = false;
  }

  saveRoomInformation() {
    const API_URL = '/api/hotels/' + this.id + '/rooms';
    this.roomObject = {
      name: this.getTypeRoomData()[0],
      price: this.formRoom.value.price,
      count: this.formRoom.value.countRoom,
      description: this.formRoom.value.description,
      capacity: this.formRoom.value.capacity,
      beds: this.getTypeBadData(),
      amenities: this.amenitiesRoomData,
      photos: this.photos
    };
    this.roomData.push(this.roomObject);
    this.HotelDataService.postHotelRooms(API_URL, this.roomObject).subscribe(
      () => {
        //
      },
      error => {
        this.showError(error.statusText);
      }
    );
    this.isConstructorFormOpened = false;
  }

  constructor(
    private route: ActivatedRoute,
    private HotelDataService: HotelDataService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {
    this.addNewConveniences();
    this.addNewPhotos();
  }

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params?.id || '';
    });
  }
}
