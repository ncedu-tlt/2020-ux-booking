import { TabsComponent } from './tabs.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Tabs',
  argTypes: {
    type: {
      control: {
        type: 'text',
        options: ''
      }
    },
    items: {
      control: {
        type: 'array',
        options: []
      },
    },
    selectedItem: {
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
    declarations: [TabsComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<TabsComponent> = (args) => ({
  ...common,
  props: {
    ...args,
    selectedEvent: (event) => {
      console.info('handle selected event: ' + event)
    }
  },
  template: `
    <b-tabs [type]="type" [items]="items" [selectedItem]="selectedItem" (selectedEvent)="selectedEvent($event)" >
    </b-tabs>
  `
});

export const horizontal = template.bind({});
horizontal.args = {
  type: 'horizontal',
  items: [
    'Опубликованные',
    'Неопубликованные',
    'Дополнительно',
  ],
  selectedItem: 'Опубликованные'
};

export const vertical = template.bind({});
vertical.args = {
  type: 'vertical',
  items: [
    'Основная информация',
    'Оплата и сервис',
    'Размещение и питание',
    'Дополнительно',
    'Комментарии'
  ],
  selectedItem: 'Основная информация'
};
