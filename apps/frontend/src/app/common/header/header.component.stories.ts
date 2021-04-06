import { Meta, Story } from '@storybook/angular/types-6-0';
import { HeaderComponent } from './header.component';
import { moduleMetadata } from '@storybook/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

export default {
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [HeaderComponent],
      imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
    })
  ],
  title: 'header',
  argTypes: {
    isNightTheme: {
      control: {
        type: 'boolean'
      }
    },
    isEnterTrue: {
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
  isEnterTrue: true,
  isLanguageRu: true,
  isNightTheme: true,
  isShowBurgerIcon: true,
  isHiddenLogo: false,
  isShowHeader: false,
  isAdmin: true,
  isShowMenu: false,
  userName: 'Иван И.'
};
