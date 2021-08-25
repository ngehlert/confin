interface RequestResult<T> {
    data: T;
}

interface Account {
    id: number;
    name: string;
    start: number;
    balance: number;
    visible: boolean;
}

interface Booking {
    account_id: number;
    category_id: number;
    date: string;
    id: number;
    name: string;
    price: number;

}

export {
    RequestResult,
    Account,
    Booking,
}
