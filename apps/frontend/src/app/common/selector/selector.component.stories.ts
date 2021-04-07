import { SelectorComponent } from './selector.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxComponent } from '../checkbox/checkbox.component';

const meta: Meta = {
  title: 'Selector'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [SelectorComponent, CheckboxComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

export const regular: Story<SelectorComponent> = () => ({
  ...common,
  template: '<b-selector>data</b-selector>'
});

export const multi: Story<SelectorComponent> = () => ({
  ...common,
  template: '<b-selector mode="multi">data</b-selector>'
});
export const admin: Story<SelectorComponent> = () => ({
  ...common,
  template: '<b-selector typeUser="admin" >data</b-selector>'
});
