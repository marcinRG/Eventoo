import {DateExtended} from './DateExtended';
import {animationsUtils} from './animations.utils';
import * as utils from './utils';

export class DatePicker {
    private htmlElement = document.querySelector('.input-date-picker');
    private txtInput = <HTMLInputElement> this.htmlElement.querySelector('.input-txt');
    private btnInput = this.htmlElement.querySelector('.input-btn');
    private nextBtn = this.htmlElement.querySelector('.right-btn');
    private prevBtn = this.htmlElement.querySelector('.left-btn');
    private monthYearLabel = this.htmlElement.querySelector('.month-display');
    private dayLabels = Array.from(this.htmlElement.querySelectorAll('.date-display thead td'));
    private daysOuterElement = this.htmlElement.querySelector('.date-display tbody');
    private datePicker = this.htmlElement.querySelector('.date-picker');
    private daysTable;
    private todayClass = 'current-day';
    private selectedDayClass = 'selected-day';
    private date: DateExtended = new DateExtended();
    private debouncedParseAndAddToOutput: any;

    constructor() {
        this.fillDayLabels();
        this.fillMonthYearLabel();
        this.fillDays();

        this.debouncedParseAndAddToOutput = utils.debounce<string>((value) => {
            if (this.date.setDateFromString(value)) {
                this.fillMonthYearLabel();
                this.fillDays();
                console.log(this.date.dateToStr());
            }
        }, 1200);

        this.btnInput.addEventListener('click', () => {
            animationsUtils.slideToggle(this.datePicker, 150, 'ease-in');
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextMonth();
        });

        this.prevBtn.addEventListener('click', () => {
            this.previousMonth();
        });

        this.txtInput.addEventListener('input', () => {
            this.debouncedParseAndAddToOutput(this.txtInput.value);
        });

    }

    private nextMonth() {
        this.date.addMonth();
        this.fillMonthYearLabel();
        this.fillDays();
        this.txtInput.value = this.date.dateToStr();
    }

    private previousMonth() {
        this.date.subtractMonth();
        this.fillMonthYearLabel();
        this.fillDays();
        this.txtInput.value = this.date.dateToStr();
    }

    private fillMonthYearLabel() {
        this.monthYearLabel.textContent = this.date.getMonthYearString();
    }

    private fillDayLabels() {
        if (this.date.daysLabels.length === this.dayLabels.length) {
            this.dayLabels.map((elem, i) => {
                elem.textContent = this.date.daysLabels[i];
            });
        }
    }

    private createDaysTable() {
        this.daysOuterElement.innerHTML = null;
        for (let i = 0; i <= 5; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j <= 6; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            this.daysOuterElement.appendChild(row);
        }
        this.daysTable = Array.from(this.daysOuterElement.querySelectorAll('td'));
    }

    private fillDays() {
        const first = this.date.firstDayWeekOfMonth();
        const last = this.date.lastDayOfMonth() + first;
        const today = new Date();
        let i = 1;
        this.createDaysTable();
        console.log(this.date.dateToStr());
        this.daysTable.map((elem, index) => {
            if ((index >= first) && (index < last)) {
                elem.textContent = i + '';
                this.addDayEventHandler(i, elem);
                if (index === (this.date.getDay() + first - 1)) {
                    elem.classList.add(this.selectedDayClass);
                }
                if (index === (today.getDate() + first - 1)) {
                    if (this.date.isThisMonthYear()) {
                        elem.classList.add(this.todayClass);
                    }
                }
                i = i + 1;
            } else {
                elem.textContent = '\xa0';
                elem.setAttribute('disabled', '');
                elem.classList.add('disabled');
            }
        });
    }

    private addDayEventHandler(i, elem) {
        elem.addEventListener('click', () => {
            this.daysTable[this.date.getDay() +
            this.date.firstDayWeekOfMonth() - 1].classList.remove(this.selectedDayClass);
            this.date.setDay(i);
            this.txtInput.value = this.date.dateToStr();
            this.daysTable[this.date.getDay() +
            this.date.firstDayWeekOfMonth() - 1].classList.add(this.selectedDayClass);
        });
    }
}
