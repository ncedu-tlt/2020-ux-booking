import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

import '../src/styles.less';

export const parameters = {
  layout: 'centered'
};

addDecorator(withKnobs);
