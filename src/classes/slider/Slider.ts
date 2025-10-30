import { ListenerT } from '@global/types';

type PropsT = {
    slider: HTMLElement;
    area: HTMLElement;
    moveArea: HTMLElement;
    reactMoveArea?: HTMLElement;
    itemClass: string;
    showEach?: boolean;
    current?: number;
    infinity?: boolean;
    buttons?: {
        prev?: HTMLElement;
        next?: HTMLElement;
    };
    pagination?: {
        parent: HTMLElement;
        itemClass: string;
    };
    callback?: (data: {
        type: string;
        current?: number;
        currentKey?: number;
        items?: ItemT[];
        reactSetCb?: () => void;
    }) => void;
    withDrag?: boolean;
    notDragItems?: string[];
    isReactInfinity?: boolean;
    getReactItems?: () => ItemT[];
    setReactItems?: (items: ItemT[]) => Promise<void>;
};

type ItemT = { id: string; key: number; isCurrent: boolean };

export default class Slider {
    slider: PropsT['slider'];
    area: PropsT['area'];
    reactMoveArea: PropsT['reactMoveArea'];

    moveArea: PropsT['moveArea'];
    itemClass: PropsT['itemClass'];
    showEach: PropsT['showEach'];
    infinity: PropsT['infinity'];
    buttons: PropsT['buttons'];
    pagination: PropsT['pagination'];
    currentKey: number;
    callback: PropsT['callback'] | undefined;
    startPos: number;
    movePos: number;
    endPos: number;
    isMove: boolean;
    allItemId: number;
    startItems: HTMLElement[];
    itemsCount: number;
    moveAreaWidth: number;
    current: number;
    itemsGroups: number[][];
    lastItemKey: number | null;
    leftMaxOffset: number;
    rightMaxOffset: number;
    animateId: number | undefined;
    buttonProcess: boolean;
    paginationInit: boolean;
    resizeTimerId: ReturnType<typeof setTimeout> | undefined;
    moveTime: number | null;
    moveTimeStart: number | null;
    moveTimerId: ReturnType<typeof setTimeout> | undefined;
    endTime: number | null;
    direction: number | undefined;
    withDrag?: boolean;
    notDragItems?: PropsT['notDragItems'];

    constructor(props: PropsT) {
        const {
            slider,
            area,
            moveArea,
            itemClass,
            showEach = false,
            infinity = false,
            buttons,
            pagination,
            current,
            callback,
            withDrag,
            notDragItems,
            reactMoveArea,
        } = props;

        this.slider = slider;
        this.area = area;
        this.reactMoveArea = reactMoveArea;
        this.moveArea = moveArea;
        this.itemClass = itemClass;
        this.showEach = !!showEach;
        this.infinity = !!infinity;
        this.buttons = buttons;
        this.pagination = pagination;
        this.currentKey = current || 0;
        this.startPos = 0;
        this.movePos = 0;
        this.endPos = 0;
        this.isMove = false;
        this.allItemId = 0;
        this.startItems = [];
        this.itemsCount = 0;
        this.moveAreaWidth = 0;
        this.current = 0;
        this.itemsGroups = [];
        this.lastItemKey = null;
        this.leftMaxOffset = 0;
        this.rightMaxOffset = 0;
        this.buttonProcess = false;
        this.paginationInit = false;
        this.moveTime = null;
        this.moveTimeStart = null;
        this.endTime = null;
        this.withDrag = withDrag;
        this.notDragItems = notDragItems;

        if (typeof callback === 'function') {
            this.callback = callback;
        }

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.resize = this.resize.bind(this);
        this.handlerKeys = this.handlerKeys.bind(this);

        this.init();
    }

    getItem(value: string | number, prop?: string): HTMLElement | null {
        if (prop === 'key') {
            let offsetItem = Infinity;
            let resultItem;

            this.area
                .querySelectorAll<HTMLElement>(`.${this.itemClass}[data-key="${value}"]`)
                .forEach((item) => {
                    if (this.getOffsetItem(item) >= 0 && this.getOffsetItem(item) < offsetItem) {
                        offsetItem = this.getOffsetItem(item);
                        resultItem = item;
                    }
                });

            if (!resultItem) {
                return null;
            }

            return resultItem as HTMLElement;
        }

        return this.area.querySelector(`.${this.itemClass}[data-id="${value}"]`) as HTMLElement;
    }

    init(): void {
        this.startPos = 0;
        this.movePos = 0;
        this.endPos = 0;
        this.isMove = false;
        this.allItemId = 0;

        const startItems: HTMLElement[] = [];

        this.area.querySelectorAll(`.${this.itemClass}`).forEach((item, key) => {
            startItems.push(item.cloneNode(true) as HTMLElement);

            item.setAttribute('data-key', key.toString());
            item.setAttribute('data-id', (this.allItemId++).toString());
        });

        this.startItems = startItems;
        this.itemsCount = startItems.length;
        this.moveAreaWidth = this.moveArea.offsetWidth;

        if (!this.area.querySelector(`.${this.itemClass}[data-key="${this.currentKey}"]`)) {
            this.currentKey = 0;
        }

        if (this.currentKey) {
            const currentItem = this.area.querySelectorAll(`.${this.itemClass}`)[this.currentKey];

            if (currentItem) {
                this.current = +(currentItem.getAttribute('data-id') as string);
            }
        }

        this.setStartInfo();
        this.setCurrent();
        this.setPagination();
        this.handlerCurrentItems();
        this.handlerPagination();
        this.setInfinity();

        if (this.buttons) {
            (['prev', 'next'] as const).forEach((dir) => {
                const button = this.buttons![dir];

                if (button) {
                    button.onclick = () => {
                        this.handlerButton({ dir });
                    };

                    button.addEventListener(
                        'mousedown',
                        (e) => {
                            e.stopPropagation();
                        },
                        { passive: false },
                    );
                    button.addEventListener(
                        'touchstart',
                        (e) => {
                            e.stopPropagation();
                        },
                        { passive: false },
                    );
                }
            });
        }

        if (this.notDragItems) {
            this.notDragItems.forEach((className) => {
                const items = document.querySelectorAll(className);

                items.forEach((item) => {
                    item.addEventListener(
                        'mousedown',
                        (e) => {
                            e.stopPropagation();
                        },
                        { passive: false },
                    );
                    item.addEventListener(
                        'touchstart',
                        (e) => {
                            e.stopPropagation();
                        },
                        { passive: false },
                    );
                });
            });
        }

        if (this.callback) {
            this.callback({ type: 'init', current: this.current, currentKey: this.current });
        }

        window.addEventListener('resize', this.resize);

        if (this.withDrag !== false) {
            this.area.addEventListener('mousedown', this.start, { passive: false });
            document.addEventListener('mousemove', this.move, { passive: false });
            document.addEventListener('mouseup', this.end);

            this.area.addEventListener('touchstart', this.start, { passive: false });
            document.addEventListener('touchmove', this.move, { passive: false });
            document.addEventListener('touchend', this.end);
        }

        document.addEventListener('keydown', this.handlerKeys);
    }

    maxItemWidth = 0;

    setStartInfo(): void {
        let maxItemWidth = 0;

        this.startItems.forEach((item) => {
            if (item.offsetWidth > maxItemWidth) {
                maxItemWidth = item.offsetWidth;
            }
        });

        this.maxItemWidth = maxItemWidth;

        let itemsGroups: number[][] = [];

        if (this.showEach) {
            itemsGroups = this.startItems.map((item, key) => [key]);
        } else {
            let currentGroup = 0;
            let currentIndex = 0;
            let currentItemOffset = 0;
            let currentItem = Array.from(
                this.area.querySelectorAll(`.${this.itemClass}`),
            )[0] as HTMLElement;

            while (currentItem) {
                currentItemOffset = this.getOffsetItem(currentItem) + currentItem.offsetWidth;

                currentGroup = Math.floor(currentItemOffset / this.area.offsetWidth);

                if (!itemsGroups[currentGroup]) {
                    itemsGroups[currentGroup] = [];
                }

                itemsGroups[currentGroup].push(currentIndex);

                currentIndex += 1;
                currentItem = currentItem.nextElementSibling as HTMLElement;
            }
        }

        this.itemsGroups = itemsGroups;

        if (!this.infinity) {
            let lastItemKey: number | null = null;

            const lastItem = this.area.querySelector(
                `.${this.itemClass}[data-key="${this.itemsCount - 1}"]`,
            ) as HTMLElement;

            if (lastItem) {
                this.area
                    .querySelectorAll<HTMLElement>(`.${this.itemClass}`)
                    .forEach((item, key) => {
                        const itemOffset = this.getOffsetItem(item);
                        const lastItemOffset = this.getOffsetItem(lastItem) + lastItem.offsetWidth;

                        if (
                            lastItemOffset - itemOffset <= this.area.offsetWidth &&
                            lastItemKey === null
                        ) {
                            lastItemKey = key;
                        }
                    });
            }

            if (this.showEach) {
                lastItemKey = this.itemsCount - 1;
            }

            this.lastItemKey = lastItemKey;

            this.leftMaxOffset = 0;

            const rightMaxItem = this.area.querySelector(
                `.${this.itemClass}[data-key="${this.lastItemKey}"]`,
            ) as HTMLElement;

            if (rightMaxItem) {
                this.rightMaxOffset = this.getOffsetItem(rightMaxItem);
            }
        } else {
            this.lastItemKey = Infinity;
        }

        // this.rightMaxOffset = 1000;
    }

    setCurrent(): void {
        this.moveToCurrentItem({ current: this.current, force: true });
    }

    handlerButton({ dir }: { dir: 'prev' | 'next' }): void {
        if (!this.buttonProcess) {
            let current = null;

            const currentItem = this.getItem(this.current);

            if (currentItem) {
                if (this.showEach) {
                    const nextItem =
                        dir === 'next'
                            ? currentItem.nextElementSibling
                            : currentItem.previousElementSibling;

                    if (nextItem) {
                        current = +(nextItem.getAttribute('data-id') as string);
                    }
                } else {
                    let resultNextItem;
                    let nextItem = currentItem;
                    const resultWidth = this.area.offsetWidth * (dir === 'next' ? 1 : -1);
                    let currentWidth = 0;

                    while (
                        nextItem &&
                        (dir === 'next'
                            ? currentWidth < resultWidth &&
                              +(nextItem.getAttribute('data-key') as string) <
                                  (this.lastItemKey as number)
                            : currentWidth > resultWidth)
                    ) {
                        nextItem = (
                            dir === 'next'
                                ? nextItem.nextElementSibling
                                : nextItem.previousElementSibling
                        ) as HTMLElement;

                        if (nextItem) {
                            resultNextItem = nextItem;

                            currentWidth =
                                this.getOffsetItem(nextItem) +
                                nextItem.offsetWidth * (dir === 'next' ? 1 : -1);
                        }
                    }

                    if (resultNextItem) {
                        current = +(resultNextItem.getAttribute('data-id') as string);
                    }
                }
            }

            if (current !== null) {
                this.buttonProcess = true;

                if (this.animateId) {
                    cancelAnimationFrame(this.animateId);

                    this.endPos = Math.round(this.movePos);
                }

                this.moveToCurrentItem({
                    current,
                    inertValue: 0,
                    callback: () => {
                        this.buttonProcess = false;
                    },
                });
            }
        }
    }

    handlerCurrentItems(offset?: number): void {
        // console.log(offset);
        if (this.showEach) {
            const currentItem = this.getItem(this.current) as HTMLElement;

            this.area.querySelectorAll(`.${this.itemClass}`).forEach((item) => {
                item.classList.remove('_current');
            });

            if (currentItem) {
                currentItem.classList.add('_current');
            }
        } else {
            this.area.querySelectorAll<HTMLElement>(`.${this.itemClass}`).forEach((item) => {
                const offsetItem = this.getOffsetItem(item) - (offset || 0);

                if (offsetItem >= 0 && offsetItem + item.offsetWidth < this.area.offsetWidth) {
                    item.classList.add('_current');
                } else {
                    item.classList.remove('_current');
                }
            });
        }
    }

    handlerPagination(): void {
        if (this.pagination && this.paginationInit) {
            const { parent, itemClass } = this.pagination;
            const currentItem = this.getItem(this.current) as HTMLElement;
            const currentItemKey = +(currentItem.getAttribute('data-key') as string);

            const currentKey = this.itemsGroups.findIndex(
                (group) => group.indexOf(currentItemKey) !== -1,
            );

            parent.querySelectorAll(`.${itemClass}`).forEach((item, key) => {
                item.classList.remove('_current');

                if (key === currentKey) {
                    item.classList.add('_current');
                }
            });
        }
    }

    setPagination(): void {
        if (this.pagination) {
            const { parent, itemClass } = this.pagination;

            if (typeof parent === 'object' && typeof itemClass === 'string') {
                this.itemsGroups.forEach((group, key) => {
                    const pagItem = document.createElement('div');

                    pagItem.setAttribute('data-key', key.toString());

                    pagItem.classList.add(itemClass);

                    parent.appendChild(pagItem);
                });

                this.paginationInit = true;
            }
        }
    }

    handlerResize(): void {
        this.destroyNodes();
        this.init();

        if (this.reactMoveArea) {
            const resultItems = this.getReactItems();

            this.callback!({
                type: 'setItems',
                items: resultItems,
            });
        }
    }

    resize(): void {
        if (this.resizeTimerId) {
            clearTimeout(this.resizeTimerId);
        }

        this.resizeTimerId = setTimeout(() => {
            this.handlerResize();
        }, 100);
    }

    getNeedItems({ dir }: { dir: 'prev' | 'next' }): { item: HTMLElement; key: number }[] {
        const startItem =
            this.moveArea.children[dir === 'prev' ? 0 : this.moveArea.children.length - 1];
        const startItemsIndexes: {
            [s: number]: HTMLElement;
        } = {};

        this.startItems.forEach((item, key) => {
            startItemsIndexes[key] = item.cloneNode(true) as HTMLElement;
        });

        const currentItem = startItem;
        const resultItems = [];

        let currentIndex = +(currentItem.getAttribute('data-key') as string);
        const inertMaxWidth = this.inertMax * this.inertStep;
        const resultWidth = inertMaxWidth + this.area.offsetWidth;
        let currentWidth = 0;

        while (currentWidth < resultWidth) {
            if (dir === 'prev') {
                if (currentIndex === 0) {
                    currentIndex = this.startItems.length;
                }

                currentIndex -= 1;
            }

            if (dir === 'next') {
                if (currentIndex === this.startItems.length - 1) {
                    currentIndex = -1;
                }

                currentIndex += 1;
            }

            const thisItem: HTMLElement = this.area.querySelector(
                `.${this.itemClass}[data-key="${currentIndex}"]`,
            ) as HTMLElement;

            if (thisItem) {
                currentWidth += thisItem.offsetWidth;
            }

            resultItems.push({ item: startItemsIndexes[currentIndex], key: currentIndex });
        }

        return resultItems;
    }

    setInfinity(): void {
        if (!this.infinity) {
            return;
        }

        const currentItem = this.moveArea.querySelector(
            `.${this.itemClass}[data-id="${this.current}"]`,
        ) as HTMLElement;

        if (!currentItem) {
            return;
        }

        (['prev', 'next'] as const).forEach((dir) => {
            const items = this.getNeedItems({ dir });

            if (items.length) {
                items.forEach(({ item, key }) => {
                    const cloneItem = item.cloneNode(true) as HTMLElement;

                    cloneItem.setAttribute('data-key', key.toString());
                    cloneItem.setAttribute('data-id', (this.allItemId++).toString());

                    this.moveArea[dir === 'prev' ? 'prepend' : 'append'](cloneItem);
                });

                if (dir === 'prev') {
                    const currentItemOffset = this.getOffsetItem(currentItem);

                    this.endPos -= currentItemOffset;

                    this.setMove(this.endPos, true);
                }
            }
        });

        const deletedItems: string[] = [];

        const inertMaxWidth = this.inertMax * this.inertStep;
        const resultWidth = inertMaxWidth + this.area.offsetWidth * 2 + this.maxItemWidth / 2;

        this.area.querySelectorAll<HTMLElement>(`.${this.itemClass}`).forEach((item) => {
            const itemOffset = this.getOffsetItem(item);

            if (Math.abs(itemOffset) > resultWidth) {
                deletedItems.push(item.getAttribute('data-id') as string);
            }
        });

        deletedItems.forEach((id) => {
            const item = this.area.querySelector(
                `.${this.itemClass}[data-id="${id}"]`,
            ) as HTMLElement;

            if (item) {
                item.remove();
            }
        });

        const resultItems = this.getReactItems();

        const currentItemOffset = this.getOffsetItem(currentItem);

        this.endPos -= currentItemOffset;

        if (this.reactMoveArea) {
            this.setMove(this.endPos, true);

            this.callback!({
                type: 'setItems',
                items: resultItems,
                reactSetCb: () => {
                    this.setMove(this.endPos);
                },
            });
        } else {
            this.setMove(this.endPos);
        }
    }

    getReactItems(): ItemT[] {
        const resultItems: ItemT[] = [];

        this.moveArea.querySelectorAll(`.${this.itemClass}`).forEach((item) => {
            const itemNode = item as HTMLElement;
            const key = +itemNode.getAttribute('data-key')!;
            const id = itemNode.getAttribute('data-id')!;
            const isCurrent = itemNode.classList.contains('_current');

            resultItems.push({ id, key, isCurrent });
        });

        return resultItems;
    }

    start(e: MouseEvent | TouchEvent): void {
        if (!this.isMove) {
            e.stopPropagation();

            if (this.animateId) {
                cancelAnimationFrame(this.animateId);

                this.animateId = undefined;

                this.endPos = this.movePos;
            }

            this.isMove = true;

            const startValue = (
                (e as TouchEvent).changedTouches
                    ? (e as TouchEvent).changedTouches[0]
                    : (e as MouseEvent)
            ).pageX;

            this.startPos = startValue;

            this.move(e);

            if (this.callback) {
                this.callback({
                    type: 'startDrag',
                });
            }
        }
    }

    setMove(value: number, force?: boolean): void {
        this.moveArea.style.transform = `translate3d(${value}px,0,0)`;

        if (this.reactMoveArea && !force) {
            this.reactMoveArea.style.transform = `translate3d(${value}px,0,0)`;
        }
    }

    move(e: MouseEvent | TouchEvent): void {
        if (this.isMove) {
            e.preventDefault();

            clearTimeout(this.moveTimerId);

            const moveValue = (
                (e as TouchEvent).changedTouches
                    ? (e as TouchEvent).changedTouches[0]
                    : (e as MouseEvent)
            ).pageX;

            if (!this.moveTime) {
                this.moveTime = new Date().getTime();
                this.moveTimeStart = moveValue;
            }

            this.moveTimerId = setTimeout(() => {
                this.moveTime = null;
                this.moveTimeStart = null;
            }, 500);

            this.direction = this.startPos - moveValue < 0 ? -1 : 1;

            let movePos = -(this.startPos - moveValue) + this.endPos;

            if (!this.infinity) {
                // console.log(movePos, -this.rightMaxOffset);

                if (movePos > this.leftMaxOffset) {
                    const delta = movePos - this.leftMaxOffset;
                    const scale = 1 + delta / 200;

                    movePos = this.leftMaxOffset + delta / scale;
                }

                if (movePos < -this.rightMaxOffset) {
                    const delta = movePos + this.rightMaxOffset;
                    const scale = 1 + Math.abs(delta) / 200;

                    movePos = -this.rightMaxOffset + delta / scale;
                }
            }

            this.movePos = movePos;

            this.setMove(this.movePos);
        }
    }

    end(e: MouseEvent | TouchEvent): void {
        if (this.isMove) {
            clearTimeout(this.moveTimerId);

            const endPos = (
                (e as TouchEvent).changedTouches
                    ? (e as TouchEvent).changedTouches[0]
                    : (e as MouseEvent)
            ).pageX;

            this.endTime = new Date().getTime();

            this.endPos = this.movePos;
            this.startPos = 0;
            this.movePos = 0;

            let inertValue = 0;

            if (this.moveTime) {
                inertValue = Math.abs(
                    ((this.moveTimeStart as number) - endPos) / (this.endTime - this.moveTime),
                );
            }

            if (inertValue > this.inertMax) {
                inertValue = this.inertMax;
            }

            // inertValue = 8;

            this.setEndCurrent(inertValue);

            this.isMove = false;
            this.endTime = null;
            this.moveTime = null;
            this.moveTimeStart = null;

            if (this.callback) {
                this.callback({
                    type: 'endDrag',
                });
            }
        }
    }

    getOffsetItem(item: HTMLElement): number {
        return item.getBoundingClientRect().x - this.area.getBoundingClientRect().x;
    }

    inertMax = 8;

    inertStep = 200;

    setEndCurrent(inertValue = 0): void {
        const end: { offset: number; current: number | null; inertValue: number } = {
            offset: Infinity,
            current: null,
            inertValue: 0,
        };

        this.area.querySelectorAll<HTMLElement>(`.${this.itemClass}`).forEach((item, key) => {
            const itemOffset = this.getOffsetItem(item);
            const id = +(item.getAttribute('data-id') as string);
            let calcItemOffset = itemOffset - this.direction! * (item.offsetWidth / 2.2);

            if (inertValue > 2) {
                calcItemOffset -= inertValue * this.inertStep * (this.direction as number);
            }

            if (
                Math.abs(calcItemOffset) < Math.abs(end.offset) &&
                (this.infinity || key <= (this.lastItemKey as number))
            ) {
                end.offset = calcItemOffset;
                end.current = id;
            }
        });

        end.inertValue = inertValue;

        this.moveToCurrentItem(end);
    }

    easeInOut(timeFraction: number): number {
        return timeFraction > 0.5
            ? 4 * Math.pow(timeFraction - 1, 3) + 1
            : 4 * Math.pow(timeFraction, 3);
    }

    easeOut(timeFraction: number): number {
        return 1 - Math.pow(1 - timeFraction, 3);
    }

    setAnimate({
        timing = this.easeOut,
        duration,
        draw,
        callback,
        getId,
    }: {
        timing: (data: number) => number;
        duration: number;
        draw: (data: number) => void;
        callback: () => void;
        getId: (data: number) => void;
    }): void {
        const start = performance.now();
        let animateId;

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;

            if (timeFraction > 1) {
                timeFraction = 1;
            }

            const progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                animateId = requestAnimationFrame(animate);

                if (typeof getId === 'function') {
                    getId(animateId);
                }
            }

            if (timeFraction === 1) {
                if (callback) {
                    callback();
                }
            }
        });
    }

    moveToCurrentItem({
        current,
        inertValue = 0,
        force,
        callback,
    }: {
        current: number | null;
        inertValue?: number;
        force?: boolean;
        callback?: () => void;
    }): void {
        const startOffset = this.endPos;
        const currentItem = this.area.querySelector(
            `.${this.itemClass}[data-id="${current}"]`,
        ) as HTMLElement;

        if (currentItem) {
            const offset = this.getOffsetItem(currentItem);

            this.current = current as number;
            this.currentKey = +(currentItem.getAttribute('data-key') as string);

            this.handlerPagination();

            if (offset !== 0) {
                if (this.callback) {
                    this.callback({
                        type: 'startMove',
                        current: this.current,
                        currentKey: this.currentKey,
                    });
                }

                if (!force) {
                    this.handlerCurrentItems(offset);

                    if (this.callback && this.reactMoveArea) {
                        const resultItems = this.getReactItems();

                        this.callback!({
                            type: 'setItems',
                            items: resultItems,
                        });
                    }
                }

                this.setAnimate({
                    timing: inertValue > 2 ? this.easeOut : this.easeInOut,
                    duration: force ? 0 : 250,
                    draw: (progress: number) => {
                        this.movePos = startOffset - progress * offset;

                        this.setMove(this.movePos);
                    },
                    callback: () => {
                        this.endPos = Math.round(this.movePos);
                        this.startPos = 0;
                        this.movePos = 0;

                        this.animateId = undefined;

                        this.setInfinity();

                        if (force) {
                            this.handlerCurrentItems();

                            if (this.callback && this.reactMoveArea) {
                                const resultItems = this.getReactItems();

                                this.callback!({
                                    type: 'setItems',
                                    items: resultItems,
                                });
                            }
                        }

                        if (typeof callback === 'function') {
                            callback();
                        }

                        if (this.callback) {
                            this.callback({
                                type: 'move',
                                current: this.current,
                                currentKey: this.currentKey,
                            });
                        }

                        // console.log(this.current);
                    },
                    getId: (id: number) => {
                        this.animateId = id;
                    },
                });
            }
        }
    }

    handlerKeys(e: KeyboardEvent): void {
        if ([37, 39].includes(e.which) && 0) {
            e.preventDefault();

            this.handlerButton({ dir: e.which === 37 ? 'prev' : 'next' });
        }
    }

    destroyNodes(): void {
        if (this.pagination && this.paginationInit) {
            const { parent } = this.pagination;

            parent.innerHTML = '';
        }

        (this.moveArea as any).style = '';

        if (this.reactMoveArea) {
            (this.reactMoveArea as any).style = '';
        }

        if (this.infinity) {
            this.moveArea.innerHTML = '';

            this.startItems.forEach((startItem) => {
                this.moveArea.appendChild(startItem.cloneNode(true));
            });
        }
    }

    destroy(): void {
        this.destroyNodes();

        if (this.buttons) {
            (['prev', 'next'] as const).forEach((key) => {
                const button = this.buttons![key];

                if (button) {
                    button.onclick = null;
                }
            });
        }

        window.removeEventListener('resize', this.resize);

        (this.area.removeEventListener as ListenerT)('mousedown', this.start, { passive: false });
        (document.removeEventListener as ListenerT)('mousemove', this.move, { passive: false });
        document.removeEventListener('mouseup', this.end);
        document.removeEventListener('keydown', this.handlerKeys);

        (this.area.removeEventListener as ListenerT)('touchstart', this.start, { passive: false });
        (document.removeEventListener as ListenerT)('touchmove', this.move, { passive: false });
        document.removeEventListener('touchend', this.end);
    }
}
