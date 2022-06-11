import { trigger, transition, query, style, group, animate } from "@angular/animations";

export const slider =
  trigger('routeAnimations', [
    transition(':increment', slideTo('right')),
    transition(':decrement', slideTo('left')),
  ]);

function slideTo(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
        opacity: 0.7
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('100ms ease', style({ [direction]: '100%' }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%' }))
      ])
    ]),
  ];
}