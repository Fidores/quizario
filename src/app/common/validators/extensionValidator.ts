import { AbstractControl } from '@angular/forms';
import { BinaryData } from 'src/app/models/quiz';

/**
 * Checks if file is of required type. It accepts File object and Base64. If no file is passed, it does not return any errors.
 * @param extensions Extensions that passes validation.
*/

export function ExtensionValidator(...extensions) {

    return function extensionValidator(control: AbstractControl): {[key: string]: any} | null {
        let file = control.value as string | any | File | BinaryData;

        if(file && typeof file === 'string') {
            // Retrive mime type from Base64 header
            const type = file.split(',')[0].split(';')[0].replace('data:', '');
            file = { file, type };
        }

        if(file) 
            return extensions.includes(file.type) && file ? null : { file: { unsupportedFile: true, supportedFiles: extensions.join(', ') } };
        else 
            return null;
    }

}