import set from './methods/set';

import DragFileI from './types';

export default class DragFile implements DragFileI {
    count = 0;

    set = set;
}
