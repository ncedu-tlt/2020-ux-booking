import { InputFieldComponent } from './input-field.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/ts3.9/client/preview/types';

const meta: Meta = {
  title: 'input-field',
  argTypes: {
    isMandatory: {
      options: [true, false]
    },
    isDisabled: {
      options: [true, false]
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: InputFieldComponent,
  moduleMetadata: {
    declarations: [InputFieldComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};
const template: Story<InputFieldComponent> = (args: InputFieldComponent) => ({
  ...common,
  props: {
    ...args
  }
});
export const regular = template.bind({});
regular.args = {
  title: 'Название',
  placeholder: 'Введите название',
  isMandatory: true,
  isDisabled: false
};
