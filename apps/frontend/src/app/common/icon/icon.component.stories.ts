import { IconComponent } from './icon.component';
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
        options: ['primary', 'flat']
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
  component: IconComponent,
  moduleMetadata: {
    declarations: [IconComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<IconComponent> = (args: IconComponent) => ({
  ...common,
  props: {
    ...args
  }
});

export const regular = template.bind({});
regular.args = {
  type: 'primary',
  hasIcon: false,
  isDisabled: false
};
