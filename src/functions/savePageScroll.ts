const setPageScroll = (target: HTMLElement, id: string): void => {
    const localKey = `scrollPage-${id}`;

    localStorage.setItem(localKey, target.scrollTop.toString());
};

const deletePageScroll = (id: string): void => {
    const localKey = `scrollPage-${id}`;

    localStorage.removeItem(localKey);
};

const scrollPage = (page: HTMLElement, id: string): void => {
    const localKey = `scrollPage-${id}`;
    const scrollTop = localStorage.getItem(localKey);

    if (typeof scrollTop === 'string' && !Number.isNaN(+scrollTop)) {
        page.scrollTop = +scrollTop;

        page.dispatchEvent(new Event('scroll'));
    }
};

const getPageScroll = (id: string): number | undefined => {
    const localKey = `scrollPage-${id}`;
    const scrollTop = localStorage.getItem(localKey);

    return typeof scrollTop === 'string' ? +scrollTop : undefined;
};

export { setPageScroll, getPageScroll, scrollPage, deletePageScroll };
