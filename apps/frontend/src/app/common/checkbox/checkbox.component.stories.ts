import { CheckboxComponent } from './checkbox.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Checkbox'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [CheckboxComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

export const regular: Story<CheckboxComponent> = () => ({
  ...common,
  template: '<b-checkbox  label="string"></b-checkbox>'
});

export const checked: Story<CheckboxComponent> = () => ({
  ...common,
  template: '<b-checkbox type="checked" label="string"></b-checkbox>'
});
export const notEdit: Story<CheckboxComponent> = () => ({
  ...common,
  template: '<b-checkbox typeEdit="not-edit"  label="string"></b-checkbox>'
});
