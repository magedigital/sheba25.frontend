import clearPhone from './clearPhone';

type ParamsT = {
    phone: string;
    withPlus?: boolean;
    withDef?: boolean;
};

export default function getFormatPhone({
    phone: argPhone,
    withPlus = false,
    withDef = true,
}: ParamsT): string {
    if (argPhone) {
        let phone = clearPhone(argPhone, true);

        if (withDef) {
            let defPhone = '';

            defPhone += phone[0];
            defPhone += '-';
            defPhone += phone.slice(1, 4);
            defPhone += '-';
            defPhone += phone.slice(4, 7);
            defPhone += '-';
            defPhone += phone.slice(7, 9);
            defPhone += '-';
            defPhone += phone.slice(9, 11);

            phone = defPhone;
        }

        if (withPlus && phone[0] !== '+') {
            phone = `+${phone}`;
        }

        return phone;
    }

    return argPhone;
}
