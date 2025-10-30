import { MouseEvent } from 'react';

type PropsT = {
    children: React.ReactElement;
    close?: (e?: MouseEvent) => void;
    className?: string;
    name: string;
    checkClose?: () => boolean;
    setRef?: (ref: HTMLElement) => void;
};

type StateT = {};

interface PopupI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    outClickHandler(this: PopupI, e: MouseEvent): void;
}

export default PopupI;
