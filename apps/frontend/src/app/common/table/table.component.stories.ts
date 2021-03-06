import { TableComponent } from './table.component';
import { ButtonIconComponent } from '../icon/button-icon.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { HttpClientModule } from '@angular/common/http';
import { bookingModule } from '../../stories.helpers';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';

const meta: Meta = {
  title: 'Table',
  argTypes: {
    config: {
      control: {
        type: 'object',
        options: []
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: bookingModule({
    declarations: [TableComponent, ButtonIconComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  })
};

const template: Story<TableComponent> = args => ({
  ...common,
  props: {
    ...args,
    buttonClicked: event => {
      console.log(
        `handle button click event: ${event.buttonType} / ${event.item.id}`
      );
    }
  },
  template: `
    <b-table [config]="config" (buttonClickEvent)="buttonClicked($event)" >
    </b-table>
  `
});

export const normal = template.bind({});
normal.args = {
  config: {
    items: [
      { id: '1', name: 'Отель 1', country: 'Испания', city: 'Мадрид' },
      { id: '2', name: 'Отель 2', country: 'Россия', city: 'Москва' },
      { id: '3', name: 'Отель 3', country: 'Латвия', city: 'Рига' },
      { id: '4', name: 'Отель 4', country: 'Нидерланды', city: 'Амстердам' },
      { id: '5', name: 'Отель 5', country: 'Швейцария', city: 'Берн' }
    ],

    columns: ['name', 'country', 'city'],

    headers: {
      name: 'Название',
      country: 'Страна',
      city: 'Город'
    },

    buttons: [ButtonIconTypesEnum.edit, ButtonIconTypesEnum.delete]
  }
};
