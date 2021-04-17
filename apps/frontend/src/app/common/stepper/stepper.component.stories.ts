import { ButtonComponent } from '../button/button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StepperComponent } from './stepper.component';
import { action } from '@storybook/addon-actions';
import { bookingModuleDecorator } from '../../stories.helpers';

export default {
  component: StepperComponent,
  decorators: [
    bookingModuleDecorator({
      declarations: [StepperComponent, ButtonComponent]
    })
  ],
  title: 'stepper',
  argTypes: {
    steps: {
      control: {
        type: 'array',
        options: []
      }
    },
    activeStep: {
      control: {
        type: 'number',
        options: 1
      }
    }
  }
} as Meta;

const Template: Story<StepperComponent> = args => ({
  component: StepperComponent,
  props: {
    ...args,
    stepChange: action('stepChange')
  }
});

export const Default = Template.bind({});
Default.args = {
  steps: ['Контактная информация', 'Выбор даты', 'Способ оплаты'],
  activeStep: 1
};
