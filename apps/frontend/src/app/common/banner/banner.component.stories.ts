import { Meta, Story } from '@storybook/angular/types-6-0';
import { BannerComponent } from './banner.component';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

export default {
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      declarations: [BannerComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
    })
  ],
  title: 'dropdown',
  argTypes: {
    activeItem: {
      control: {
        type: 'text',
        options: ''
      },
      items: {
        control: {
          type: 'array',
          options: []
        },
        isLeftAligned: {
          control: {
            type: 'boolean'
          }
        }
      }
    }
  }
} as Meta;

const Template: Story<BannerComponent> = args => ({
  component: BannerComponent,
  props: {
    ...args,
    stateChange: action('stateChange')
  },
  template:
    '<div style="display: flex; justify-content: center">' +
    '<b-dropdown (stateChange)="stateChange($event)" ' +
    '[items]="items" ' +
    '[activeItem]="activeItem" ' +
    '[isLeftAligned]="isLeftAligned"></b-dropdown>' +
    '</div>'
});

export const Default = Template.bind({});
Default.args = {
  isLeftAligned: false,
  activeItem: 'Сначала дешевые',
  items: [
    'Сначала дешевые',
    'Сначала дорогие',
    'По рейтингу пользователей',
    'По количеству звёзд'
  ]
};
