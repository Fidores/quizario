import { AbstractControl } from '@angular/forms';

export function ExtensionValidator(...extensions) {

    return function extensionValidator(control: AbstractControl): {[key: string]: any} | null {
        const file = control.value as File;

        return extensions.includes(file.type) ? null : { file: { unsupportedFile: true, supportedFiles: extensions.join(', ') } };

    }

}
