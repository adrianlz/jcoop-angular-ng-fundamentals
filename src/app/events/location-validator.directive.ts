import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLocation]',
    providers: [{ provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): {[key: string]: any} {
        console.log('LocationValidator - validate...', NG_VALIDATORS);
        let addresControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];

        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if ((addresControl && addresControl.value && cityControl && cityControl.value && countryControl && countryControl.value) ||
            (onlineUrlControl && onlineUrlControl.value)) {
                return null;
        } else {
            return { validateLocation: true};
        }
    }
}
