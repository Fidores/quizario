/**
 * Converts File to Base64 type.
 * @param file File that will be converted to Base64 type.
 * @returns Promise that resolved ,returns Base64 string; 
*/

export const fileToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', error => reject(error));
});