type ItemT = Record<any, string> | string;

export default function sortAlphabet(prop: string | undefined, a: ItemT, b: ItemT): number {
    const textA =
        typeof a === 'object' && prop ? a[prop]?.toLowerCase() : (a as string)?.toLowerCase() || '';
    const textB =
        typeof b === 'object' && prop ? b[prop]?.toLowerCase() : (b as string)?.toLowerCase() || '';

    return textA < textB ? -1 : textA > textB ? 1 : 0;
}
