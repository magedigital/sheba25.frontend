import getDateSum from './getDateSum.ts';
import getFormatedNumber from './getFormatedNumber.ts';

const monthNames = [
    ['Январь', 'Января'],
    ['Февраль', 'Февраля'],
    ['Март', 'Марта'],
    ['Апрель', 'Апреля'],
    ['Май', 'Мая'],
    ['Июнь', 'Июня'],
    ['Июль', 'Июля'],
    ['Август', 'Августа'],
    ['Сентябрь', 'Сентября'],
    ['Октябрь', 'Октября'],
    ['Ноябрь', 'Ноября'],
    ['Декабрь', 'Декабря'],
];

type TypesT = 'full' | 'fullText' | 'time' | 'text' | 'yearText';

export { monthNames };

export default function getFormatedDate({
    date,
    type,
    isShortYear = false,
    withSupports,
}: {
    date: Date;
    type: TypesT;
    isShortYear?: boolean;
    withSupports?: boolean;
}): string {
    let resultDate = '';
    const year = isShortYear ? date.getFullYear().toString().slice(2, 4) : date.getFullYear();

    if (date) {
        if (withSupports) {
            if (getDateSum(date) === getDateSum()) {
                return 'Сегодня';
            }

            if (getDateSum(date) === getDateSum() - 1) {
                return 'Вчера';
            }
        }

        if (type === 'full') {
            resultDate += getFormatedNumber(date.getDate());
            resultDate += '.';
            resultDate += getFormatedNumber(date.getMonth() + 1);
            resultDate += '.';
            resultDate += getFormatedNumber(year);
            resultDate += ' в\xa0';
            resultDate += getFormatedNumber(date.getHours());
            resultDate += ':';
            resultDate += getFormatedNumber(date.getMinutes());

            return resultDate;
        }

        if (type === 'fullText') {
            resultDate += date.getDate();
            resultDate += ' ';
            resultDate += monthNames[date.getMonth()][1];
            resultDate += ' ';
            resultDate += date.getFullYear();
            resultDate += ' в ';
            resultDate += getFormatedNumber(date.getHours());
            resultDate += ':';
            resultDate += getFormatedNumber(date.getMinutes());

            return resultDate;
        }

        if (type === 'time') {
            resultDate += getFormatedNumber(date.getHours());
            resultDate += ':';
            resultDate += getFormatedNumber(date.getMinutes());

            return resultDate;
        }

        if (type === 'text') {
            resultDate += date.getDate();
            resultDate += ' ';
            resultDate += monthNames[date.getMonth()][1];

            return resultDate;
        }

        if (type === 'yearText') {
            resultDate += date.getDate();
            resultDate += ' ';
            resultDate += monthNames[date.getMonth()][1];
            resultDate += ' ';
            resultDate += date.getFullYear();
            resultDate += ' г.';

            return resultDate;
        }

        resultDate += getFormatedNumber(date.getDate());
        resultDate += `.`;
        resultDate += getFormatedNumber(date.getMonth() + 1);
        resultDate += `.`;
        resultDate += getFormatedNumber(year);

        return resultDate;
    }

    return resultDate;
}
