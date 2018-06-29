import {Velocity} from 'velocity-animate';
import {Injectable} from '@angular/core';

@Injectable()
export class AnimationsUtils {
    public isShownString = 'display: block';

    public doSlideAnimation(elem, animation, slideTime, easing) {
        console.log('do slide animation');
        console.log(elem);
        console.log(animation);
        console.log(slideTime);
        console.log(easing);
        Velocity(elem, animation, {
            duration: slideTime,
            easing,
        });
    }

    public scrollTo(elem, time, easing) {
        Velocity(elem, 'scroll', {
            duration: time,
            easing,
        });
    }

    public findElementHeight(elem) {
        console.log('height');
    }

    public isShown(elem) {
        if ((elem.hasAttribute('style')) &&
            (elem.getAttribute('style').indexOf(this.isShownString) >= 0)) {
            return true;
        }
        return false;
    }

    public slideToggle(elem, time, ease) {
        if (this.isShown(elem)) {
            this.doSlideAnimation(elem, 'slideUp', time, ease);
        } else {
            this.doSlideAnimation(elem, 'slideDown', time, ease);
        }
    }

    public animateProgress(elem, time, ease, precentage) {
        elem.style.width = 0;
        Velocity(elem, {
            width: precentage,
        }, {
            duration: time,
            easing: ease,
        });
    }
}
