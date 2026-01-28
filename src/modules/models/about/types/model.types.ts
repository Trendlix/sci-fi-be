export interface IAboutHero {
    title: string[];
    description: string;
}

export interface IAboutCard {
    icon: {
        url?: string;
        path?: string;
        contentType?: string;
        uploadedAt?: string;
    };
    title: string;
    description: string;
}

export interface IAboutMin {
    description: string;
    cards: IAboutCard[];
}

export interface IServiceCard {
    tag: string;
    icon: string;
    title: string;
    description: string;
}

export interface IService {
    description: string;
    cards: IServiceCard[];
}

export interface IPreValue {
    title: string[];
    description: string;
    file?: {
        url?: string;
        path?: string;
        contentType?: string;
        uploadedAt?: string;
    };
}

export interface IValueCard {
    icon: string;
    title: string;
    description: string;
}

export interface IValue {
    description: string;
    cards: IValueCard[];
}

export interface IAboutBase {
    hero: IAboutHero;
    about: IAboutMin;
    service: IService;
    preValue: IPreValue;
    value: IValue;
}

export interface IAbout {
    ar?: IAboutBase;
    en?: IAboutBase;
}

