import I from '../types.ts';

const itemHandler: I['itemHandler'] = async function ({ id }) {
    const { name, onChange } = this.props;

    await onChange({ name, value: id });
    await this.dropHandler(false);
};

export default itemHandler;
