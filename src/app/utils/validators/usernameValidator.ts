import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const regex = /^[A-Za-z]+$/;

    return regex.test(control.value) ? null : { alphabetOnly: true };
  };
}
