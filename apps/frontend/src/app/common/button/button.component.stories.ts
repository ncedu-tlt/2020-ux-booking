import { ButtonComponent } from './button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Button'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [ButtonComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
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
