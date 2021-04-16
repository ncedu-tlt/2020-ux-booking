import { CheckboxComponent } from './checkbox.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
// import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/ts3.9/client/preview/types';

const meta: Meta = {
  title: 'Checkbox',
  argTypes: {
    checked: {
      control: {
        options: [true, false]
      }
    },
    disabled: {
      control: {
        options: [true, false]
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [CheckboxComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
  ...common,
  props: {
    ...args
  },
  template:
    '<b-checkbox  [label]="label" [checked]="checked" [disabled]="disabled"></b-checkbox>'
});

export const regular = template.bind({});
regular.args = {
  checked: false,
  disabled: false,
  label: 'string'
};
