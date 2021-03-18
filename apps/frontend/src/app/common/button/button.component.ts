import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'b-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input()
    type: 'primary' | 'default' = 'default';

    @Input()
    buttonType: 'button' | 'reset' | 'submit' = 'button';
}
