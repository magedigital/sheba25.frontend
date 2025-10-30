export default function getStartUrl(path: string): string {
    if (!['login', 'forget', 'anket', 'profile', 'cheque'].includes(path.split('/')[0]) && 0) {
        path = `/${path}`;
    }

    return path;
}
