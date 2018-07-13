import {Velocity} from 'velocity-animate';

class AnimationsUtils {
    private hiddenAttribute = 'data-hidden-attribute';
    private isNotDisplayedString = 'none';
    private isDisplayedString = 'block';

    public slideToggle(elem, time, ease) {
        if (this.isNotDisplayed(elem)) {
            this.slideDown(elem, time, ease, 'hidden');
        } else {
            this.slideUp(elem, time, ease, 'hidden');
        }
    }

    public slideDown(elem, time, ease, overflowStyle) {
        const height = this.getElementHeight(elem);
        elem.style.overflow = overflowStyle;
        elem.style.height = 0 + 'px';
        elem.style.display = this.isDisplayedString;
        elem.removeAttribute(this.hiddenAttribute);
        Velocity(elem, {
            height: height + 'px',
        }, {
            duration: time,
            easing: ease,
        });
    }

    public slideUp(elem, time, ease, overflowStyle) {
        elem.style.overflow = overflowStyle;
        Velocity(elem, {
            height: '0px',
        }, {
            duration: time,
            easing: ease,
            complete: () => {
                elem.style.display = this.isNotDisplayedString;
                elem.setAttribute(this.hiddenAttribute, '');
            },
        });
    }

    private getElementHeight(elem) {
        const previousVisibility = window.getComputedStyle(elem).visibility;
        const previousDisplay = window.getComputedStyle(elem).display;
        const previousHeight = window.getComputedStyle(elem).height;
        elem.style.height = null;
        elem.style.visibility = 'hidden';
        elem.style.display = 'block';
        const height = elem.offsetHeight;
        elem.style.height = previousHeight;
        elem.style.display = previousDisplay;
        elem.style.visibility = previousVisibility;
        return height;
    }

    private isNotDisplayed(elem) {
        return (window.getComputedStyle(elem).display === this.isNotDisplayedString);
    }
}

export const animationsUtils = new AnimationsUtils();
