import { Directive, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[tpValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidatorDirDirective, multi: true },
  ],
})
export class ValidatorDirDirective implements Validator, OnInit {
  constructor() {}
  ngOnInit() {}

  validate(control: FormControl) {
    let telephoneNumber: String = control.value;
    if (telephoneNumber == null) {
      return { validNumber: false };
    }

    if (isNaN(Number(telephoneNumber)) || telephoneNumber.length !== 10) {
      return { validNumber: false };
    }
    return null;
  }
}
