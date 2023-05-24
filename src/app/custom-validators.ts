import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  // static passwordMatchValidator(control: any) {
  //   const password: string = control.get('password').value; // get password from our password form control
  //   const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
  //   // compare is the password math
  //   if (password !== confirmPassword) {
  //     // if they don't match, set an error in our confirmPassword form control
  //     control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
  //   }
  // }
  
  static passwordMatchValidator(control: AbstractControl) {
    const passwordControl: any = control.get('password'); // get password from our password form control
    const confirmPasswordControl: any = control.get('confirmPassword'); // get password from our confirmPassword form control

    if (passwordControl && confirmPasswordControl) {
      const password: string = passwordControl.value
      const confirmPassword: string = confirmPasswordControl.value

      // compare is the password math
      if (password !== confirmPassword) {
        // if they don't match, set an error in our confirmPassword form control
        confirmPasswordControl.setErrors({ NoPassswordMatch: true });
      }
    }
  }
}
