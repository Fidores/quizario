import { animation } from '@angular/animations';
import { style, animate } from '@angular/animations';


export const fadeOut = animation([
    style({ opacity: 1 }),
    animate('{{ duration }} ease-in', style({ opacity: 0 }))
]);