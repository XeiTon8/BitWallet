export type Item = {

    title: string;
    imgUrl: string;
    price: number;
    oldPrice: number;
    isDiscount: boolean;
    docID: string;
    id: number;
}
export enum Status  {
    LOADING = 'loading',
    SUCCESS = 'complete',
    ERROR = 'error'
}

export interface CartSliceState {
    items: Item[],
    docID: string[],
    status: Status;
    isCartOpened: boolean;
}