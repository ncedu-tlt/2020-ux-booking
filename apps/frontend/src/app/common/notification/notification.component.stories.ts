import { Meta, Story } from '@storybook/angular/types-6-0';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { NotificationComponent } from './notification.component';
import { NotificationTypesEnum } from '../../enums/notification-types.enum';
import { action } from '@storybook/addon-actions';
import { bookingModule } from '../../stories.helpers';

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
  moduleMetadata: bookingModule({
    declarations: [NotificationComponent]
  })
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
