import setAnimate from './setAnimate';

type ParamsT = {
    scrollNode: HTMLElement | undefined | null;
    blockNode: HTMLElement | undefined | null;
    offset?: number;
    duration?: number;
    dir?: 'top';
};

export default function scrollToBlock({
    blockNode,
    scrollNode,
    offset = 0,
    duration = 300,
    dir,
}: ParamsT): void {
    if (!blockNode || !scrollNode) {
        return;
    }

    const offsetTop = blockNode.getBoundingClientRect().y - scrollNode.getBoundingClientRect().y;
    let blockStartOffset = offsetTop + offset;
    const scrollStart = scrollNode.scrollTop;

    if (dir === 'top') {
        blockStartOffset = offsetTop + offset;
    } else if (blockNode.offsetHeight < scrollNode.offsetHeight) {
        blockStartOffset -= (scrollNode.offsetHeight - blockNode.offsetHeight) / 2;
    }

    if (scrollStart + blockStartOffset < 0) {
        blockStartOffset = -scrollStart;
    }

    if (scrollStart + blockStartOffset > scrollNode.scrollHeight - scrollNode.offsetHeight) {
        blockStartOffset = scrollNode.scrollHeight - scrollNode.offsetHeight - scrollStart;
    }

    if (duration === 0) {
        scrollNode.scrollTop = scrollStart + blockStartOffset;

        return;
    }

    setAnimate({
        duration,
        draw: (progress) => {
            scrollNode.scrollTop = scrollStart + progress * blockStartOffset;
        },
    });
}
