type PropsT = {
    item: string;
    duration: number;
    isCurrent: boolean;
    onlyChild: boolean;
    isNotRemove: boolean;
};

export default function removeTransition({
    item = 'html',
    duration = 0,
    isCurrent = false,
    onlyChild = false,
    isNotRemove = false,
}: Partial<PropsT>): { styleComponent: HTMLStyleElement } {
    const head = document.querySelector('head') as HTMLElement;
    const styleComponent = document.createElement('style');

    if (isCurrent) {
        styleComponent.appendChild(
            document.createTextNode(
                `${item}{transition: ${
                    duration === 0 ? `none` : `${duration}s ease-in-out`
                }!important;};`,
            ),
        );
    } else if (onlyChild) {
        styleComponent.appendChild(
            document.createTextNode(
                `${item}::before, ${item}::after, ${item} *, ${item} *::before, ${item} *::after{transition: ${
                    duration === 0 ? `none` : `${duration}s ease-in-out`
                }!important;};`,
            ),
        );
    } else {
        styleComponent.appendChild(
            document.createTextNode(
                `${item}, ${item}::before, ${item}::after, ${item} *, ${item} *::before, ${item} *::after{transition: ${
                    duration === 0 ? `none` : `${duration}s ease-in-out`
                }!important;};`,
            ),
        );
    }

    head.appendChild(styleComponent);

    if (!isNotRemove) {
        setTimeout(() => {
            styleComponent.innerHTML = '';

            styleComponent.remove();
        }, 100);
    }

    return { styleComponent };
}
