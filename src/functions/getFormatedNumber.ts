export default function getFormatedNumber(num: string | number): string {
    const numStr = parseInt(num.toString(), 10);

    return +numStr < 10 ? `0${numStr}` : numStr.toString();
}
