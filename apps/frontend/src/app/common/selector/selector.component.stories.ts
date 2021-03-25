import { SelectorComponent } from './selector.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Selector'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [SelectorComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

export const regular: Story<SelectorComponent> = () => ({
  ...common,
  template: '<b-selector>data</b-selector>'
});

export const primary: Story<SelectorComponent> = () => ({
  ...common,
  template: '<b-selector typeMulti="multi">data</b-selector>'
});
