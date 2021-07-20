import { ListOfHotelPopupComponent } from './list-of-hotel-popup.component';
import { ButtonComponent } from '../button/button.component';
import { InputFieldComponent } from '../input-field/input-field.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'List-of-hotel-popup',
  argTypes: {
    title: {
      control: {
        type: 'text',
        options: ''
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [ListOfHotelPopupComponent, ButtonComponent, InputFieldComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule, ReactiveFormsModule]
  }
};

const template: Story<ListOfHotelPopupComponent> = args => ({
  ...common,
  props: {
    ...args
  },
  template: `
    <b-list-of-hotel-popup [title]="title" >
    </b-list-of-hotel-popup>
  `
});

export const normal = template.bind({});
normal.args = {
  title: 'Введите название отеля'
};
