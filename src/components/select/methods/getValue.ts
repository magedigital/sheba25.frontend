import I from '../types.ts';

const getValue: I['getValue'] = function () {
    const { items, support, value } = this.props;

    return items.find((item) => item.id === value)?.content || support;
};

export default getValue;
