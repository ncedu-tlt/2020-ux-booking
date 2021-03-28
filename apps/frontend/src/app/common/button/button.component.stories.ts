import { ButtonComponent } from './button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Button',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['default', 'primary']
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [ButtonComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  ...common,
  props: {
    ...args
  },
  template: '<b-button [type]="type">Test</b-button>'
});

export const regular = template.bind({});
regular.args = {
  type: 'primary'
};
