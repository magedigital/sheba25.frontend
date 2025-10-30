export default async function copyInBuffer(content: string): Promise<void> {
    await navigator.clipboard.writeText(content);
}
