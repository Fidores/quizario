import { AbstractControl } from '@angular/forms';
import { BinaryData } from 'src/app/models/quiz';
import { arrayBufferToBase64 } from 'src/app/helpers/arrayBufferToBase64';

/**
 * Checks if file is of required type. It accepts File object, Base64 and BinaryData. If no file is passed, it does not return any errors.
 * @param extensions Extensions that passes validation.
*/

export function ExtensionValidator(...extensions) {

    return function extensionValidator(control: AbstractControl): {[key: string]: any} | null {
        let file = control.value as string | any | File | BinaryData;   
        
        if(file.binaryData && file.binaryData.type === 'Buffer') 
            file = `${ file.header },${ arrayBufferToBase64(file.binaryData.data) }`;
        

        if(file && typeof file === 'string') {
            const type = file.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
            file = { file, type };
        }

        if(file) 
            return extensions.includes(file.type) && file ? null : { file: { unsupportedFile: true, supportedFiles: extensions.join(', ') } };
        else 
            return null;
    }

}