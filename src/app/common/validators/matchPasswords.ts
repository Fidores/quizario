import { AbstractControl } from '@angular/forms';

export function MatchPasswordsValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password.value !== confirmPassword.value ? { passwordsMatch: false } : null;
}
