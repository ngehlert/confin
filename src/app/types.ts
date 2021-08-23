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

export {
    RequestResult,
    Account,
}
