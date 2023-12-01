import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const now = new Date()
    const selectedDate = new Date(value)
    const dateIsValid = now < selectedDate

    return dateIsValid ?  null: { invalidDate: true } ;
  };
}
