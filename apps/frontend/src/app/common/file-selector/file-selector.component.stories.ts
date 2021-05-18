import { FileSelectorComponent } from './file-selector.component';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { StoryFnAngularReturnType } from '@storybook/angular/dist/client/preview/types';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'file-selector',
  argTypes: {}
};
export default meta;

const common: StoryFnAngularReturnType = {
  component: FileSelectorComponent,
  moduleMetadata: {
    declarations: [FileSelectorComponent],
    imports: [AngularSvgIconModule.forRoot(), HttpClientModule]
  }
};
const template: Story<FileSelectorComponent> = (
  args: FileSelectorComponent
) => ({
  ...common,
  props: {
    ...args,
    filesEvent: action('filesEvent')
  }
});
export const regular = template.bind({});
regular.args = {
  uploadPhoto: 'Файл не найден'
};
