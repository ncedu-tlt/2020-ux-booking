import { ButtonComponent } from './button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';

const meta: Meta = {
  title: 'Button'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [ButtonComponent]
  }
};

export const regular: Story<ButtonComponent> = () => ({
  ...common,
  template: '<b-button>Test</b-button>'
});

export const primary: Story<ButtonComponent> = () => ({
  ...common,
  template: '<b-button type="primary">Test</b-button>'
});
