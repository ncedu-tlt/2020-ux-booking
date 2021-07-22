import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HotelDto } from '@booking/models/hotel.dto';
import { FormBuilder } from '@angular/forms';
import { HotelDataService } from '../../services/hotel-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitleComponent {
  @Input()
  title: string;
  public nameId: string;
  public name: string;
  constructor(
    private hotelDataService: HotelDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe(params => {
      this.nameId = params?.id || '';
      this.hotelDataService
        .getHotelNameId(this.nameId)
        .subscribe((nameId: string) => {
          this.name = nameId;
        });
    });
  }
}
