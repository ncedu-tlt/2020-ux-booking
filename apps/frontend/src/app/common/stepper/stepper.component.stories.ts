import { ButtonComponent } from '../button/button.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { StepperComponent } from './stepper.component';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

export default {
  component: StepperComponent,
  decorators: [
    moduleMetadata({
      declarations: [StepperComponent, ButtonComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
    })
  ],
  title: 'TaskList',
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
    onStepChange: action('onStepChange')
  }
});

export const Default = Template.bind({});
Default.args = {
  steps: ['Контактная информация', 'Выбор даты', 'Способ оплаты'],
  activeStep: 1,
  onStep() {
    console.log('тест');
  }
};
