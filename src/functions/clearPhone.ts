export default function clearPhone(phone: string, full?: boolean): string {
    if (phone) {
        const numbersPhone = phone.toString().replace(/[^\d]/g, '');

        if (numbersPhone.length === 10) {
            if (full) {
                return `7${numbersPhone}`;
            }

            return numbersPhone;
        }

        if (full) {
            return numbersPhone;
        }

        return numbersPhone.slice(1);
    }

    return '';
}
