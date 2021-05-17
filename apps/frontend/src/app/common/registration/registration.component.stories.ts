import { AuthorizationComponent } from './registration.component';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { bookingModule } from '../../stories.helpers';

const meta: Meta = {
  title: 'authorization'
};
export default meta;

const common = {
  component: AuthorizationComponent,
  moduleMetadata: bookingModule({
    declarations: [AuthorizationComponent]
  })
};
const template: Story<AuthorizationComponent> = (
  args: AuthorizationComponent
) => ({
  ...common,
  props: {
    ...args
  }
});
export const regular = template.bind({});
regular.args = {};
