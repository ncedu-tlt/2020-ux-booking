import { ButtonIconComponent } from './button-icon.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const meta: Meta = {
  title: 'Icon',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'edit',
          'delete',
          'blockUser',
          'admin',
          'add',
          'checkMark',
          'like',
          'Share',
          'RIGHT',
          'LEFT',
          'cross',
          'star'
        ]
      }
    }
  }
};

export default meta;

const common: StoryFnAngularReturnType = {
  component: ButtonIconComponent,
  moduleMetadata: {
    declarations: [ButtonIconComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<ButtonIconComponent> = (args: ButtonIconComponent) => ({
  ...common,
  props: {
    ...args
  }
});

export const regular = template.bind({});
regular.args = {
  type: 'cross'
};
