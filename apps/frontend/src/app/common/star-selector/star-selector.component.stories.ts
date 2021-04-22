import { Meta, Story } from '@storybook/angular/types-6-0';
import { StarSelectorComponent } from './star-selector.component';
import { action } from '@storybook/addon-actions';
import { bookingModuleDecorator } from '../../stories.helpers';

export default {
  component: StarSelectorComponent,
  decorators: [
    bookingModuleDecorator({
      declarations: [StarSelectorComponent]
    })
  ],
  title: 'star-selector',
  argTypes: {
    isEditable: {
      control: {
        type: 'boolean'
      }
    },
    subName: {
      control: {
        type: 'text'
      }
    },
    selectedItem: {
      control: {
        type: 'number'
      }
    }
  }
} as Meta;

const Template: Story<StarSelectorComponent> = args => ({
  component: StarSelectorComponent,
  props: {
    ...args,
    selectedItemEvent: action('selectedItemEvent')
  }
});

export const Default = Template.bind({});
Default.args = {
  isEditable: true,
  subName: 'Hotel name',
  selectedItem: 0
};
