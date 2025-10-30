const chars = [
    'и',
    'а',
    'в',
    'во',
    'на',
    'с',
    'со',
    'к',
    'но',
    'по',
    'за',
    'о',
    'у',
    'об',
    'под',
    'из',
    'не',
    'вы',
    'их',
    'от',
    'при',
    'или',
    'я',
    'где',
    'это',
    'до',
    'то',
];

export default function setSpacesInText(str: unknown, notUse: string[] = []): string {
    let newStr = ``;

    if (typeof str === 'string') {
        const strUpdate = str.replace(/\n/gi, ' ');

        const arrText = strUpdate.split(' ');

        for (let i = 0; i < arrText.length; i++) {
            if (
                chars.indexOf(arrText[i].toLowerCase().replace(/[^а-я]/gi, '')) !== -1 &&
                notUse.indexOf(arrText[i].toLowerCase()) === -1
            ) {
                newStr += `${arrText[i]}&nbsp;`;
            } else {
                newStr += `${arrText[i]} `;
            }
        }

        // const reg = new RegExp('&!nbsp;', 'g');

        // newStr = newStr.replace(reg, '&nbsp;');

        if (newStr[newStr.length - 1] === ' ') {
            newStr = newStr.slice(0, -1);
        }

        return newStr;
    }

    return '';
}
