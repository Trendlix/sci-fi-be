export interface IFooterAddress {
    title: string;
    url: string;
}

export interface IFooterBase {
    x?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    telegram?: string;
    threads?: string;
    snapchat?: string;
    pinterest?: string;
    reddit?: string;
    email: string;
    address: IFooterAddress;
    title: string[];
    subscribeDescription: string;
}

export interface IFooter {
    ar?: IFooterBase;
    en?: IFooterBase;
}

