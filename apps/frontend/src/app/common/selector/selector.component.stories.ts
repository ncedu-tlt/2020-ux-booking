import { SelectorComponent } from './selector.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/ts3.9/client/preview/types';
import { ButtonComponent } from '../button/button.component';

const meta: Meta = {
  title: 'Selector',
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: ['default', 'multi']
      }
    },
    typeUser: {
      control: {
        type: 'select',
        options: ['default', 'admin']
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: SelectorComponent,
  moduleMetadata: {
    declarations: [SelectorComponent, CheckboxComponent, ButtonComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  ...common,
  props: {
    ...args
  }
});

export const regular = template.bind({});
regular.args = {
  itemList: ['Только завтрак', 'Всё включено', 'Завтрак и ужин', 'Без питания'],
  mode: 'default',
  typeUser: 'default',
  titleSelector: 'Питание'
};
