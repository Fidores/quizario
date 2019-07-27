interface Offscreen {
    isOffscreen: Boolean;
    difference: number;
    side: '' | 'right' | 'left';
}

interface Options {
    autoCorrect?: Boolean;
}

/**
 * Checks if element falls of the screen. You can set autoCorrect to move it in view.
 * @param el Element to check
 * @param _options Funtion options
*/

export const isOffscreen = (el: HTMLElement, _options?: Options): Offscreen  => {
    const elPos = el.getBoundingClientRect();
    const options: Options = { ..._options };
    const offscreen: Offscreen = {
      isOffscreen: elPos.left < 0 || elPos.right > window.innerWidth,
      difference: 0,
      side: ''
    };

    if (elPos.left < 0) {
      offscreen.difference = -elPos.left;
      offscreen.side = 'left';
    } else if (elPos.right > window.innerWidth) {
      offscreen.difference = -(elPos.right - window.innerWidth);
      offscreen.side = 'right';
    }

    if (options.autoCorrect) {
      el.style.transform = `translateX(${ offscreen.difference }px)`;
    }

    return offscreen;
};
