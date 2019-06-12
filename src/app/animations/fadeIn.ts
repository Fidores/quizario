import { animation } from '@angular/animations';
import { style, animate } from '@angular/animations';


export const fadeIn = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} ease-out', style({ opacity: 1 }))
]);