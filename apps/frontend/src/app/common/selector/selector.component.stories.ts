import { SelectorComponent } from './selector.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from '../checkbox/checkbox.component';

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
  moduleMetadata: {
    declarations: [SelectorComponent, CheckboxComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  ...common,
  props: {
    ...args
  },
  template:
    '<b-selector [mode]="mode" [typeUser]="typeUser" [titleSelector] ="titleSelector"></b-selector>'
});

export const regular = template.bind({});
regular.args = {
  mode: 'default',
  typeUser: 'default',
  titleSelector: 'Питание'
};
