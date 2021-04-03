import { TabsComponent } from './tabs.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Tabs'
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [TabsComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

export const vertical: Story<TabsComponent> = () => ({
  ...common,
  template: '<b-tabs></b-tabs>'
});

export const horizontal: Story<TabsComponent> = () => ({
  ...common,
  template: '<b-tabs type="horizontal"></b-tabs>'
});
