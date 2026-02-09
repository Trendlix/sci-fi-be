export interface IFloorFile {
    url?: string;
    path?: string;
    contentType?: string;
    uploadedAt?: string;
}

export interface IFloorHeader {
    title: string;
    description: string;
}

export interface IFloorHero {
    title: string[];
    description: string;
    files: IFloorFile[];
}

export interface IFloorFeatureCard {
    file: IFloorFile;
    title: string;
    description: string;
    cta: string;
}

export interface IFloorFeatures {
    cards: IFloorFeatureCard[];
}

export interface IFloorServiceCard {
    title: string;
    thumbnail: IFloorFile;
    files: IFloorFile[];
}

export interface IFloorServices {
    title: string[];
    hidden?: boolean;
    description: string;
    cards: IFloorServiceCard[];
}

export interface IFloorGroundCard {
    file: IFloorFile;
    title: string;
    description: string;
    cta: string;
}

export interface IFloorGrounds {
    title: string[];
    hidden?: boolean;
    cards: IFloorGroundCard[];
}

export interface IFloorSliderCard {
    file: IFloorFile;
    title: string;
    description: string;
}

export interface IFloorSlider {
    title: string[];
    description: string;
    cards: IFloorSliderCard[];
}

export interface IFloorBase {
    header: IFloorHeader;
    hero: IFloorHero;
    features: IFloorFeatures;
    services: IFloorServices;
    grounds: IFloorGrounds;
    floorsSlider: IFloorSlider;
}

export interface IFloor {
    ar?: IFloorBase;
    en?: IFloorBase;
    landFloorIndex?: number;
    landFloorTitle?: {
        ar?: string;
        en?: string;
    };
}

