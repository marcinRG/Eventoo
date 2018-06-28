import {Component, OnInit} from '@angular/core';
import {AnimationsUtils} from '../../utilities/animations.utils';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
})

export class NavBarComponent implements OnInit {
    private navbarElement;
    private menuElement;
    private navbarButton;
    private sizeTriggerUp = 100;
    private sizeTriggerDown = 100;
    private slideTime = 1000;
    private previousWidth = window.outerWidth;
    private pageSizeTrigger = 768;
    private classToChange = 'changed';
    private previousPosition = 0;

    constructor(private animationUtils: AnimationsUtils) {
    }

    public ngOnInit() {
        console.log('on init');
        this.navbarElement = document.querySelector('.nav');
        this.menuElement = document.querySelector('.menu-items');
        this.navbarButton = document.querySelector('.menu-btn');
        this.setNavbarClass();
        this.scrollEventHandler();
        this.toggleMenuOnBrowserResizeHandler();
        this.toggleMenuOnButtonPressHandler();
    }

    private changeNavbarClass(breakVal) {
        const scrollTop = window.pageYOffset;
        if (!((scrollTop < breakVal && this.previousPosition < breakVal) ||
            ((scrollTop > breakVal && this.previousPosition > breakVal)))) {
            if (scrollTop > breakVal) {
                this.navbarElement.classList.add(this.classToChange);
            } else {
                this.navbarElement.classList.remove(this.classToChange);
            }
        }
        this.previousPosition = scrollTop;
    }

    private scrollEventHandler() {
        window.addEventListener('scroll', () => {
            this.setNavbarClass();
        });
    }

    private setNavbarClass() {
        const scrollBreak =
            (this.sizeTriggerDown > window.outerWidth) ? this.sizeTriggerDown : this.sizeTriggerUp;
        this.changeNavbarClass(scrollBreak);
    }

    private toggleMenuOnButtonPressHandler() {
        this.navbarButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleMenu();
        });
    }

    private toggleMenu() {
        this.animationUtils.slideToggle(this.menuElement, this.slideTime, 'easeOut');
    }

    private isSmallSize(size) {
        return (size < this.pageSizeTrigger);
    }

    private getSizeAndResetStyles() {
        const currentSize = window.outerWidth;
        if (this.isSmallSize(this.previousWidth) && !(this.isSmallSize(currentSize))) {
            this.menuElement.removeAttribute('style');
        }
        if (!this.isSmallSize(this.previousWidth) && (this.isSmallSize(currentSize))) {
            this.menuElement.removeAttribute('style');
        }
        return currentSize;
    }

    private toggleMenuOnBrowserResizeHandler() {
        window.addEventListener('resize', () => {
            this.previousWidth = this.getSizeAndResetStyles();
        });
    }
}
