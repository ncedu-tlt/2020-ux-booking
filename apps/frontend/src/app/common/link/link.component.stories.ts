import { LinkComponent } from './link.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'link',
  argTypes: {
    type: {
      control: {
        type: 'string',
        options: ['href']
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: LinkComponent,
  moduleMetadata: {
    declarations: [LinkComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};
const template: Story<LinkComponent> = (args: LinkComponent) => ({
  ...common,
  props: {
    ...args
  }
});
export const regular = template.bind({});
regular.args = {
  type: 'href'
};
