import { Meta, Story } from '@storybook/angular/types-6-0';
import { StarSelectorComponent } from './star-selector.component';
import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

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
    stateItems: {
      control: {
        type: 'boolean'
      }
    },
    subName: {
      control: {
        type: 'text'
      }
    },
    selectItems: {
      control: {
        type: 'number'
      }
    },
    hoverItems: {
      control: {
        type: 'number'
      }
    }
  }
} as Meta;

const Template: Story<StarSelectorComponent> = args => ({
  component: StarSelectorComponent,
  props: {
    ...args
  }
});

export const Default = Template.bind({});
Default.args = {
  stateItems: true,
  subName: 'Hotel name',
  selectItems: 0,
  hoverItems: 0
};
