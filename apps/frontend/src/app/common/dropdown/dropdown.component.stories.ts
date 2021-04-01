import { Meta, Story } from '@storybook/angular/types-6-0';
import { DropdownComponent } from './dropdown.component';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

export default {
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      declarations: [DropdownComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
    })
  ],
  title: 'dropdown',
  argTypes: {
    defaultState: {
      control: {
        type: 'string',
        options: ''
      },
      sortList: {
        control: {
          type: 'array',
          options: []
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
  }
});

export const Default = Template.bind({});
Default.args = {
  defaultState: 'Сначала дешевые',
  sortList: [
    'Сначала дешевые',
    'Сначала дорогие',
    'По рейтингу пользователей',
    'По количеству звёзд'
  ]
};
