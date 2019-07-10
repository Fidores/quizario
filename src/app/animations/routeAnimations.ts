import { trigger, transition, query, style, animate, group } from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0.8)',
        }),
      ], { optional: true }),
      query(':enter', [
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ], { optional: true })
    ]),
]);

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') ),
    transition('* <=> *', slideTo('right'))
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('300ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('300ms ease', style({ [direction]: '0%' }))
      ])
    ]),
  ];
}