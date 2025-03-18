export interface InputItem {
    shortDescription: string,
    price: string
}

export interface InputReceipt {
    retailer: string,
    purchaseDate: string,
    purchaseTime: string,
    total: string,
    items: InputItem[]
}

export interface Item {
    shortDescription: string,
    price: number
}

export interface Receipt {
    retailer: string,
    purchaseDatetime: Date,
    total: number,
    items: Item[]
}