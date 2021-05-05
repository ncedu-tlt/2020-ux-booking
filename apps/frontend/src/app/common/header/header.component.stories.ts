import { Meta, Story } from '@storybook/angular/types-6-0';
import { HeaderComponent } from './header.component';
import { bookingModuleDecorator } from '../../stories.helpers';

export default {
  component: HeaderComponent,
  decorators: [
    bookingModuleDecorator({
      declarations: [HeaderComponent]
    })
  ],
  title: 'header',
  argTypes: {
    isNightTheme: {
      control: {
        type: 'boolean'
      }
    },
    isLanguageRu: {
      control: {
        type: 'boolean'
      }
    },
    isShowBurgerIcon: {
      control: {
        type: 'boolean'
      }
    },
    isHiddenLogo: {
      control: {
        type: 'boolean'
      }
    },
    isShowHeader: {
      control: {
        type: 'boolean'
      }
    },
    isAdmin: {
      control: {
        type: 'boolean'
      }
    },
    isShowMenu: {
      control: {
        type: 'boolean'
      }
    },
    userName: {
      control: {
        type: 'text',
        options: ''
      }
    }
  }
} as Meta;

const Template: Story<HeaderComponent> = args => ({
  component: HeaderComponent,
  props: {
    ...args
  }
});

export const Default = Template.bind({});
Default.args = {
  isLanguageRu: true,
  isNightTheme: true,
  isShowBurgerIcon: true,
  isHiddenLogo: false,
  isShowHeader: false,
  isAdmin: true,
  isShowMenu: false,
  userName: 'Иван И.'
};
