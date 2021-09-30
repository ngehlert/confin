import {
    Component, forwardRef, Host, Input, OnInit, Optional, SkipSelf,
} from '@angular/core';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'emsi-input',
    templateUrl: './input.html',
    styleUrls: ['./input.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
class InputComponent implements ControlValueAccessor, OnInit {
    @Input() public formControlName!: string;
    @Input() public label: string = '';
    @Input() public type: 'text' | 'password' = 'text';

    public value: string = '';
    public parentControl?: AbstractControl;

    private onControlChange: ((value: string) => void) | undefined;
    private onControlTouched: (() => void) | undefined;

    constructor(
        @Optional() @Host() @SkipSelf()
        private controlContainer: ControlContainer,
    ) {
    }

    public ngOnInit(): void {
        if (!this.controlContainer || !this.controlContainer.control || !this.formControlName) {
            throw new Error('Missing parent FormGroup directive or formControlName from host element of the component');
        }

        if (this.controlContainer && this.formControlName && this.controlContainer.control) {
            const control: AbstractControl | null = this.controlContainer.control.get(this.formControlName);
            if (control) {
                this.parentControl = control;
            }
        }
    }

    public registerOnChange(fn: (url: string | null) => void): void {
        this.onControlChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onControlTouched = fn;
    }

    public setDisabledState(_isDisabled: boolean): void {
        // empty
    }

    public writeValue(value: string): void {
        this.value = value;
    }

    public onChange(newValue: string): void {
        this.value = newValue;
        if (this.onControlChange && this.onControlTouched) {
            this.onControlChange(this.value);
            this.onControlTouched();
        }
    }

    public getError(): string | null {
        return this.parentControl
            && this.parentControl.errors
            && typeof this.parentControl.errors[1] === 'string'
            ? this.parentControl.errors[1]
            : null;
    }
}

export {InputComponent};
