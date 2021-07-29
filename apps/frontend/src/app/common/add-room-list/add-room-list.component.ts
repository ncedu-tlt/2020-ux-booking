import { Component, Input, OnInit } from '@angular/core';
import { HotelDataService } from '../../services/hotel-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-add-room-list',
  templateUrl: './add-room-list.component.html',
  styleUrls: ['./add-room-list.component.less']
})
export class AddRoomListComponent implements OnInit {
  @Input()
  roomData;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private HotelDataService: HotelDataService
  ) {}

  deleteRoom(idRoom, id): void {
    this.roomData.splice(id, 1);
    this.HotelDataService.deleteHotelRoom(this.id, idRoom).subscribe();
  }
  getCount(id) {
    return new Array(this.roomData[id].count);
  }
  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.id = params?.id || '';
    });
    this.HotelDataService.getHotelRooms(this.id).subscribe(data => {
      this.roomData = data;
    });
  }
}
