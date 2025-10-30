export default function getFormatPrice(number: unknown): string {
    if (typeof number !== 'number') {
        return '0';
    }

    const numberStr = number.toString();
    const numberItems = numberStr.includes(',') ? numberStr.split(',') : numberStr.split('.');
    const numberFloat = numberItems.length === 1 ? '' : `,${numberItems.pop()}`;

    const numberArr = numberItems[0].toString().split('').reverse();
    let resultPrice = '';

    numberArr.forEach((item, key) => {
        resultPrice += item;

        if (key % 3 === 2 && key !== numberArr.length - 1) {
            resultPrice += ' ';
        }
    });

    resultPrice = resultPrice.split('').reverse().join('');

    if (resultPrice[0] === '-' && resultPrice[1] === ' ') {
        return `-${resultPrice.slice(2)}${numberFloat}`;
    }

    return `${resultPrice}${numberFloat}`;
}
