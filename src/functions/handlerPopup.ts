import { PopupsNamesT, PopupsT } from '@global/types';
import { dispatcher } from '@redux/redux';

export default function handlerPopup<T extends PopupsNamesT>(
    name: T,
    { ...props }: { isShow: boolean } & PopupsT[T],
): void {
    dispatcher({ type: name as any, data: props });

    document.dispatchEvent(new CustomEvent('popupChange', { detail: { isShow: props.isShow } }));
}
