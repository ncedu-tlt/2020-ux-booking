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
        options: ['flat', 'primary', 'secondary', 'action']
      }
    },
    hasIcon: {
      control: {
        type: 'select',
        options: [true, false]
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['default', 'small']
      }
    },
    isDisabled: {
      control: {
        type: 'select',
        options: [true, false]
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: ButtonComponent,
  moduleMetadata: {
    declarations: [ButtonComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};
const template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  ...common,
  props: {
    ...args
  }
});
export const regular = template.bind({});
regular.args = {
  type: 'primary',
  text: 'Save',
  hasIcon: false,
  size: 'small',
  isDisabled: false
};
