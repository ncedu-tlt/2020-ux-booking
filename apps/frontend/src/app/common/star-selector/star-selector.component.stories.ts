import { Meta, Story } from '@storybook/angular/types-6-0';
import { StarSelectorComponent } from './star-selector.component';
import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { action } from '@storybook/addon-actions';

export default {
  component: StarSelectorComponent,
  decorators: [
    moduleMetadata({
      declarations: [StarSelectorComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
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
