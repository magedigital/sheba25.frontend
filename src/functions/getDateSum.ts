export default function getDateSum(date: string | Date = new Date()): number {
    const resultDate = new Date(date);

    return resultDate.getFullYear() * 365 + resultDate.getMonth() * 31 + resultDate.getDate();
}
