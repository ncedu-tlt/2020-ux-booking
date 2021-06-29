import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'b-add-room-form',
  templateUrl: './add-room-form.component.html',
  styleUrls: ['./add-room-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoomFormComponent {
  listOfRoom = [];
  flag = true;
  isOpenConstructorForm = true;
  roomData = [
    {
      id: 0,
      name: 'Номер Люкс',
      price: 45,
      count: 4,
      description: 'loremLorem',
      capacity: 'loremLorem',
      beds: 'Одна двуспальная',
      hotel: 'loremLorem',
      photos: 'dara',
      amenitiesRoom: 'dara',
      bookingDetails: 'dara'
    }
  ];
  countConveniences = [0];
  countPhotos = [0];

  openForm(): void {
    this.isOpenConstructorForm = true;
  }

  addNewConveniences(): void {
    this.countConveniences.push(
      this.countConveniences[this.countConveniences.length - 1] + 1
    );
  }

  deleteConveniences(id): void {
    this.countConveniences.splice(this.countConveniences.indexOf(id), 1);
  }

  addNewPhotos(): void {
    this.countPhotos.push(this.countPhotos[this.countPhotos.length - 1] + 1);
  }

  setData($event): void {
    console.log($event);
  }

  deletePhotos(id): void {
    this.countPhotos.splice(this.countPhotos.indexOf(id), 1);
  }

  remove(): void {
    if (this.isOpenConstructorForm) {
      this.isOpenConstructorForm = false;
    }
  }

  saveRoomInformation(): void {
    if (this.isOpenConstructorForm) {
      //
    } else {
      // drop to back-end
    }
  }
}
