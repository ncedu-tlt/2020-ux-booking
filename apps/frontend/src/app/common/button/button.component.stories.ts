import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

export default {
    title: 'Button',
    moduleMetadata: {
        imports: [BrowserModule]
    },
    component: ButtonComponent
}

export const primary = () => ({
    props: {
        type: 'primary'
    }
});
