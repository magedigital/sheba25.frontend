import I from '../types.ts';

const getPrizeId: I['getPrizeId'] = function () {
    const { user, levels } = this.props;

    if (user?.nextActPrizeId) {
        return user.nextActPrizeId;
    }

    const prize = user?.prizes?.find((item) => item.id === levels[1]);

    return prize?.id;
};

export default getPrizeId;
