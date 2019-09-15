import { AbstractControl } from '@angular/forms';

/**
 * Checks if file is of required type. It accepts File object and Base64. If no file is passed, it does not return any errors.
 * @param extensions Extensions that passes validation.
*/

export function ExtensionValidator(...extensions) {

    return function extensionValidator(control: AbstractControl): {[key: string]: any} | null {
        let file = control.value as string | any | File;

        if(file && typeof file === 'string') {
            const temp = file.split(',')[0].split(';')[0].replace('data:', '');
            file = { file, type: temp };
        }

        if(file) 
            return extensions.includes(file.type) && file ? null : { file: { unsupportedFile: true, supportedFiles: extensions.join(', ') } };
        else 
            return null;
    }

}
