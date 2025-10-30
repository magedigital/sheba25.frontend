interface DragFileI {
    count: number;

    set(
        this: DragFileI,
        data: {
            area: HTMLElement;
            overHandler: () => void;
            leaveHandler: () => void;
            dropHandler: (files: FileList) => void;
        },
    ): void;
}

export default DragFileI;
