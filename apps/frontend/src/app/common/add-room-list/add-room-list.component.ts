import { Component, Input } from '@angular/core';
import { RoomDto } from '@booking/models/room.dto';

@Component({
  selector: 'b-add-room-list',
  templateUrl: './add-room-list.component.html',
  styleUrls: ['./add-room-list.component.less']
})
export class AddRoomListComponent {
  @Input()
  roomData: RoomDto[];
}
