export class DateExtended {
    public daysLabels = ['Nie', 'Pon', 'Wto', 'Sro', 'Czw', 'Pio', 'Sob'];
    public monthsLabels = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
        'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
    private date = new Date();
    private separator = '/';

    public daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    public firstDayWeekOfMonth() {
        const dateTemp = new Date(this.date.getTime());
        dateTemp.setDate(1);
        return dateTemp.getDay();
    }

    public lastDayOfMonth() {
        return this.daysInMonth(this.date.getMonth(), this.date.getFullYear());
    }

    public addMonth() {
        const dateTemp = new Date(this.date.getTime());
        if (dateTemp.getMonth() < 11) {
            this.date.setMonth(dateTemp.getMonth() + 1);
        } else {
            this.date.setFullYear(dateTemp.getFullYear() + 1);
            this.date.setMonth(0);
        }
    }

    public subtractMonth() {
        const dateTemp = new Date(this.date.getTime());
        if (dateTemp.getMonth() > 0) {
            this.date.setMonth(dateTemp.getMonth() - 1);
        } else {
            this.date.setFullYear(dateTemp.getFullYear() - 1);
            this.date.setMonth(11);
        }
    }

    public isThisMonthYear() {
        const tempDate = new Date();
        return (this.date.getFullYear() === tempDate.getFullYear()) && (this.date.getMonth() === tempDate.getMonth());
    }

    public getMonthYearString() {
        return `${this.monthsLabels[this.date.getMonth()]} ${this.date.getFullYear()}`;
    }

    public setDateFromString(dateAsString) {
        this.date = new Date(dateAsString);
    }

    public dateToStr() {
        return this.date.toISOString().replace(/^(\d{4}).(\d{2}).(\d{2}).*/, '$1' +
            this.separator + '$2' + this.separator + '$3');
    }

    public setDay(day: number) {
        this.date.setDate(day);
    }

    public getDay() {
        return this.date.getDate();
    }

}
