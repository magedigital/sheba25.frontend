import getFormatedNumber from '../../../functions/getFormatedNumber.ts';

import InputI from '../types.ts';

const validateDate = function (value: string, dateWithPast?: boolean): string {
    const resultItems: string[] = value.split('.');
    const [day, month, year] = resultItems;

    if (day?.replace(/[^\d]/gi, '').length === 2) {
        if (+day < 1) {
            resultItems[0] = '01';
        }

        if (+day > 31) {
            resultItems[0] = '31';
        }
    }

    if (month?.replace(/[^\d]/gi, '').length === 2) {
        if (+month < 1) {
            resultItems[1] = '01';
        }

        if (+month > 12) {
            resultItems[1] = '12';
        }
    }

    if (year?.replace(/[^\d]/gi, '').length === 4) {
        if (+year < new Date().getUTCFullYear() - 5 && !dateWithPast) {
            resultItems[2] = (new Date().getUTCFullYear() - 5).toString();
        }

        if (+year < new Date().getUTCFullYear() - 100 && dateWithPast) {
            resultItems[2] = (new Date().getUTCFullYear() - 100).toString();
        }

        if (+year > new Date().getUTCFullYear() + 100) {
            resultItems[2] = (new Date().getUTCFullYear() + 100).toString();
        }
    }

    if (!dateWithPast) {
        const date = new Date();

        date.setUTCFullYear(+resultItems[2]);
        date.setUTCDate(1);
        date.setUTCMonth(+resultItems[1] - 1);
        date.setUTCDate(+resultItems[0]);

        const nowDate = new Date();

        nowDate.setUTCHours(0, 0, 0, 0);

        if (date.getTime() < nowDate.getTime()) {
            resultItems[0] = getFormatedNumber(nowDate.getUTCDate()).toString();
            resultItems[1] = getFormatedNumber(nowDate.getUTCMonth() + 1).toString();
            resultItems[2] = getFormatedNumber(nowDate.getFullYear()).toString();
        }
    }

    if (dateWithPast) {
        const date = new Date();

        date.setUTCFullYear(+resultItems[2]);
        date.setUTCDate(1);
        date.setUTCMonth(+resultItems[1] - 1);
        date.setUTCDate(+resultItems[0]);

        const nowDate = new Date();

        nowDate.setUTCHours(0, 0, 0, 0);

        if (date.getTime() > nowDate.getTime()) {
            resultItems[0] = getFormatedNumber(nowDate.getUTCDate()).toString();
            resultItems[1] = getFormatedNumber(nowDate.getUTCMonth() + 1).toString();
            resultItems[2] = getFormatedNumber(nowDate.getFullYear()).toString();
        }
    }

    return resultItems.join('.');
};

const validateTime = function (value: string): string {
    const resultItems = value.split(':');
    const [hours, minutes] = resultItems;

    if (hours?.replace(/[^\d]/gi, '').length === 2) {
        if (+hours > 23) {
            resultItems[0] = '23';
        }
    }

    if (minutes?.replace(/[^\d]/gi, '').length === 2) {
        if (+minutes > 59) {
            resultItems[1] = '59';
        }
    }

    return resultItems.join(':');
};

const validateReg: InputI['validateReg'] = function (value) {
    const { reg, dateWithPast } = this.props;

    if (reg === 'date') {
        return validateDate(value, dateWithPast);
    }

    if (reg === 'monthDate') {
        const resultItems: string[] = value.split('.');
        const [month, year] = resultItems;

        if (month?.replace(/[^\d]/gi, '').length === 2) {
            if (+month < 1) {
                resultItems[1] = '01';
            }

            if (+month > 12) {
                resultItems[1] = '12';
            }
        }

        if (year?.replace(/[^\d]/gi, '').length === 4) {
            if (+year < new Date().getUTCFullYear() - 5) {
                resultItems[2] = (new Date().getUTCFullYear() - 5).toString();
            }

            if (+year > new Date().getUTCFullYear() + 50) {
                resultItems[2] = (new Date().getUTCFullYear() + 50).toString();
            }
        }

        if (!dateWithPast) {
            const date = new Date();

            date.setUTCFullYear(+resultItems[2]);
            date.setUTCDate(1);
            date.setUTCMonth(+resultItems[1] - 1);
            date.setUTCDate(+resultItems[0]);

            const nowDate = new Date();

            nowDate.setUTCHours(0, 0, 0, 0);

            if (date.getTime() < nowDate.getTime()) {
                resultItems[0] = getFormatedNumber(nowDate.getUTCDate()).toString();
                resultItems[1] = getFormatedNumber(nowDate.getUTCMonth() + 1).toString();
                resultItems[2] = getFormatedNumber(nowDate.getFullYear()).toString();
            }
        }

        return resultItems.join('.');
    }

    if (reg === 'time') {
        return validateTime(value);
    }

    if (reg === 'dateAndTime') {
        const [date, time] = value.split(' ');

        return `${validateDate(date, dateWithPast)} ${validateTime(time)}`;
    }

    if (reg === 'datePeriod') {
        const [start, end] = value.split('–');

        const resultStart = validateDate(start.trim(), dateWithPast);
        const resultEnd = validateDate(end.trim(), dateWithPast);

        return `${resultStart} – ${resultEnd}`;
    }

    return value;
};

export default validateReg;
