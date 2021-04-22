import { Meta, Story } from '@storybook/angular/types-6-0';
import { DropdownComponent } from './dropdown.component';
import { action } from '@storybook/addon-actions';
import { bookingModuleDecorator } from '../../stories.helpers';

export default {
  component: DropdownComponent,
  decorators: [
    bookingModuleDecorator({
      declarations: [DropdownComponent]
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

const Template: Story<DropdownComponent> = args => ({
  component: DropdownComponent,
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
