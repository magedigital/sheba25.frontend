type UserT = {
    userId: string;
    status: 'EXTRA_ANKET_REQUIRED' | 'ANKET_REQUIRED' | 'PARTICIPANT' | 'EMAIL_CONFIRM_REQUIRED';
    personal: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    exp: number;
    mailing: '1' | '0';
    extraDataRequired?: Record<
        string,
        {
            title: string;
            type: 'string' | 'phone' | 'address' | 'date' | 'photo';
            value: string | { url: string; name?: string };
            regexp?: string;
            errorText?: string;
            pointId?: string;
        }
    >;
    isFirstAnket: boolean;
};

export default UserT;
