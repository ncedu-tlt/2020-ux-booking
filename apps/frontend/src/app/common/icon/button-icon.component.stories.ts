import { ButtonIconComponent } from './button-icon.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { ButtonIconTypesEnum } from '../../enums/button-icon-types.enum';
import { bookingModule } from '../../stories.helpers';

const meta: Meta = {
  title: 'Icon',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ButtonIconTypesEnum
      }
    }
  }
};

export default meta;

const common: StoryFnAngularReturnType = {
  component: ButtonIconComponent,
  moduleMetadata: bookingModule({
    declarations: [ButtonIconComponent]
  })
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
