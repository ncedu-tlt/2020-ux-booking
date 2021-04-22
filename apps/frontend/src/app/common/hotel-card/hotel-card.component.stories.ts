import { Meta, Story } from '@storybook/angular/types-6-0';
import { HotelCardComponent } from './hotel-card.component';
import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { StarSelectorComponent } from '../star-selector/star-selector.component';

export default {
  component: HotelCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [HotelCardComponent, StarSelectorComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
    })
  ],
  title: 'hotel-card',
  argTypes: {
    hotelInfo: {
      control: {
        type: 'object'
      }
    }
  }
} as Meta;

const Template: Story<HotelCardComponent> = args => ({
  component: HotelCardComponent,
  props: {
    ...args
  }
});

export const Default = Template.bind({});
Default.args = {
  hotelInfo: {
    name: 'Hotel super puper price',
    hotelImgUrl: 'assets/icons/hotel.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi commodi cum debitis delectus dolore doloremque, eos e',
    address: {
      country: 'russia',
      city: 'moscow'
    },
    starsCount: 1,
    countReviews: 10,
    hotelRating: 9.6,
    minPrice: 2300,
    currency: '$',
    freeCancellation: true,
    services: [
      {
        iconUrl: 'assets/icons/car.svg'
      },
      {
        iconUrl: 'assets/icons/dryer.svg'
      }
    ]
  }
};
