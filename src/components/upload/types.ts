import { ChangeEvent } from 'react';

type PropsT = {
    fileName?: string;
    onChange: (e: {
        target: { files: ChangeEvent<HTMLInputElement>['target']['files'] };
    }) => Promise<void>;
};

type StateT = {
    isOver?: boolean;
};

interface UploadI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    isDragInit?: boolean;

    dragInit(this: UploadI): void;

    renderMain(this: UploadI): React.ReactNode;
    renderResult(this: UploadI): React.ReactNode;
    renderOver(this: UploadI): React.ReactNode;
}

export default UploadI;
