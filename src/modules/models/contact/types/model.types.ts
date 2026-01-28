export const enum GetInTouchType {
    phone = "phone",
    email = "email",
    address = "address",
    hours = "hours"
}

export interface IGetInTouch {
    type: GetInTouchType;
    lines: string[];
}

export interface IContactBase {
    hero: {
        description: string;
    };
    getInTouch: {
        description: string;
        cards: IGetInTouch[];
    };
}

export interface IContact {
    ar?: IContactBase;
    en?: IContactBase;
}