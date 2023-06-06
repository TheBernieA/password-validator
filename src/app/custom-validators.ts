import { ValidationErrors, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

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


  static passwordMatchValidator(control: AbstractControl) {
    const email: string = control.get('email')?.value// get email value
    const emailControl: string = control.get('email')?.value.split('@')[0]// get characters before the @ symbol and ignore special characters
    const emailCharacterControl: string = control.get('email')?.value.split('@')[0].replace(/[^a-zA-Z ]/g, '') // get characters before the @ symbol and ignore special characters
    const passwordControl: any = control.get('password'); // get password from our password form control
    const confirmPasswordControl: any = control.get('confirmPassword'); // get password from our confirmPassword form control

    if (passwordControl && confirmPasswordControl) {
      const password: string = passwordControl.value
      const confirmPassword: string = confirmPasswordControl.value

      // compare is the password math
      if (password !== confirmPassword) {
        // if they don't match, set an error in our confirmPassword form control
        confirmPasswordControl.setErrors({ NoPassswordMatch: true });
        // check if password contains the word password
        if (password.toLowerCase().includes('password'.toLowerCase())) {
          passwordControl.setErrors({ ContainWordPassword: true })
        }
        // check if password contains words from the email with symbol or without symbols
        else if (email !== '' && password.toLowerCase().includes(emailCharacterControl.toLowerCase()) || password.toLowerCase().includes(emailControl.toLowerCase())) {
          // console.log('has value', emailControl);
          passwordControl.setErrors({ HasEmailCharacters: true })
        }
      }
    }
  }

}
