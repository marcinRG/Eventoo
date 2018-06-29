// import {Velocity} from 'velocity-animate';
//
// class AnimationsUtils {
//     public isShownString = 'display: block';
//     public isNotDisplayedString = 'display:none';
//
//     public findElementHeight(elem) {
//         console.log('height');
//         const height = elem.offsetHeight;
//         console.log('height from offse:' + height);
//         console.log('elem height:' + this.getElementHeight(elem));
//         return height;
//     }
//
//     public getElementHeight(elem) {
//         const prevVisibility = elem.style.visibility;
//         const prevDisplay = elem.style.display;
//         elem.style.visibility = 'hidden';
//         elem.style.display = 'block';
//         const height = elem.offsetHeight;
//         const width = elem.offsetWidth;
//         console.log(height);
//         console.log(width);
//         elem.style.display = prevDisplay;
//         elem.style.visibility = prevVisibility;
//         return {height, width};
//     }
//
//     public isNotDisplayed(elem) {
//         return (window.getComputedStyle(elem).display === 'none');
//     }
//
//     public slideToggle(elem, time, ease) {
//         if (this.isNotDisplayed(elem)) {
//             console.log('hidden');
//             const rect = this.getElementHeight(elem);
//             elem.style.width = rect.width + 'px';
//             elem.style.height = 0 + 'px';
//             elem.style.display = 'block';
//             this.animate(elem, time, ease, rect.height + 'px');
//         } else {
//             console.log('shown');
//         }
//     }
//
//     public anim(elem) {
//         Velocity(elem, {backgroundColor: 'red'});
//     }
//
//     public animate(elem, time, ease, value) {
//         elem.style.width = 0;
//         Velocity(elem, {
//             height: value,
//         }, {
//             duration: time,
//             easing: ease,
//         });
//     }
// }
//
// export const
//     animationsUtils = new AnimationsUtils();
