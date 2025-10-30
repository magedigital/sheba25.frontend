import I from '../types.ts';

const getTableItems: I['getTableItems'] = function () {
    const { model, winnersData } = this.state;

    const items = (winnersData?.winners || []).map((item, key) => ({
        _id: key.toString(),
        raffleId: item.raffleId,
        date: item.publish,
        email: item.email,
        phone: item.phone,
        prize: item.prize,
    }));

    return items.filter(
        (item) =>
            !model ||
            ((model.phone?.length !== 4 ||
                item.phone.replace(/\D/gi, '').slice(-4) === model.phone) &&
                (!model.date || item.raffleId === model.date)),
    );
};

export default getTableItems;
