import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { NotificationComponent } from './notification.component';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'Notification',
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: NotificationTypesEnum
      }
    }
  }
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: NotificationComponent,
  moduleMetadata: {
    declarations: [NotificationComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};

const template: Story<NotificationComponent> = (
  args: NotificationComponent
) => ({
  ...common,
  props: {
    ...args,
    closeEvent: action('closeEvent')
  }
});

export const regular = template.bind({});
regular.args = {
  type: NotificationTypesEnum.success,
  message: 'Hotel information was published successfully'
};
