import { PageTitleComponent } from './page-title.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Page-title',
  argTypes: {
    title: {
      control: {
        type: 'text',
        options: ''
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  moduleMetadata: {
    declarations: [PageTitleComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<PageTitleComponent> = args => ({
  ...common,
  props: {
    ...args
  },
  template: `
    <b-page-title [title]="title" >
    </b-page-title>
  `
});

export const normal = template.bind({});
normal.args = {
  title: 'Отели'
};
