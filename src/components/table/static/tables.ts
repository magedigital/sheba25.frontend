const tables = {
    winners: {
        mainCol: 'date',
        allCols: ['date', 'email', 'phone', 'prize'],
        cols: ['email', 'phone', 'prize'],
        supports: {
            date: 'Дата розыгрыша',
            email: 'E-mail',
            phone: 'Номер телефона',
            prize: 'Приз',
        },
    },
    cheques: {
        mainCol: 'date',
        allCols: ['date', 'fd', 'status', 'result'],
        cols: ['fd', 'status', 'result'],
        supports: {
            date: 'Дата загрузки',
            fd: 'ФД',
            status: 'Статус',
            result: 'Результат',
        },
    },
    balls: {
        mainCol: 'date',
        allCols: ['date', 'balls', 'comment'],
        cols: ['balls', 'comment'],
        supports: {
            date: 'Дата',
            balls: 'Баллов',
            comment: 'Комментарий',
        },
    },
    codes: {
        mainCol: 'code',
        allCols: ['code', 'date'],
        cols: ['date'],
        supports: {
            code: 'Код',
            date: 'Дата регистрации',
        },
    },
} as const;

type TableT = {
    mainCol: string;
    allCols: readonly string[];
    cols: readonly string[];
    supports: Record<string, string>;
};

export default tables;
export type { TableT };
