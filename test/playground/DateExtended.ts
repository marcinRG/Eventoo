export class DateExtended {
    public daysLabels = ['Nie', 'Pon', 'Wto', 'Sro', 'Czw', 'Pio', 'Sob'];
    public monthsLabels = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
        'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    private date = new Date();
    private separator = '/';

    constructor() {
        this.date = new Date();
        this.date.setHours(0);
        this.date.setMinutes(0);
        this.date.setSeconds(1);
        this.date.setMilliseconds(0);
    }

    public daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getUTCDate();
    }

    public firstDayWeekOfMonth() {
        const dateTemp = new Date(this.date.getTime());
        dateTemp.setUTCDate(1);
        return dateTemp.getUTCDay();
    }

    public lastDayOfMonth() {
        return this.daysInMonth(this.date.getUTCMonth(), this.date.getUTCFullYear());
    }

    public addMonth() {
        const dateTemp = new Date(this.date.getTime());
        if (dateTemp.getUTCMonth() < 11) {
            this.date.setUTCMonth(dateTemp.getUTCMonth() + 1);
        } else {
            this.date.setUTCFullYear(dateTemp.getUTCFullYear() + 1);
            this.date.setUTCMonth(0);
        }
    }

    public subtractMonth() {
        const dateTemp = new Date(this.date.getTime());
        if (dateTemp.getUTCMonth() > 0) {
            this.date.setUTCMonth(dateTemp.getUTCMonth() - 1);
        } else {
            this.date.setUTCFullYear(dateTemp.getUTCFullYear() - 1);
            this.date.setUTCMonth(11);
        }
    }

    public isThisMonthYear() {
        const tempDate = new Date();
        return (this.date.getUTCFullYear() === tempDate.getUTCFullYear()) &&
            (this.date.getUTCMonth() === tempDate.getUTCMonth());
    }

    public getMonthYearString() {
        return `${this.monthsLabels[this.date.getUTCMonth()]} ${this.date.getUTCFullYear()}`;
    }

    public setDateFromString(dateAsString) {
        let date = new Date();
        try {
            date = new Date(dateAsString);
            this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            return true;
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    public dateToStr() {
        return this.date.toISOString().replace(/^(\d{4}).(\d{2}).(\d{2}).*/, '$1' +
            this.separator + '$2' + this.separator + '$3');
    }

    public setDay(day: number) {
        this.date.setUTCDate(day);
    }

    public getDay() {
        return this.date.getUTCDate();
    }
}
