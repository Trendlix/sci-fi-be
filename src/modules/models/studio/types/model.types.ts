export type IStudioFile = {
    url?: string;
    path?: string;
    contentType?: string;
    uploadedAt?: string;
};

export interface IStudioHero {
    title: string[];
    description: string;
}

export interface IStudioAboutCard {
    tag: string;
    file?: IStudioFile;
    icon: string;
    title: string;
    description: string;
}

export interface IStudioAbout {
    description: string;
    cards: IStudioAboutCard[];
}

export interface IStudioPartners {
    description: string;
    files: IStudioFile[];
}

export interface IStudioWhyUsLine {
    icon: string;
    line: string;
}

export interface IStudioWhyUs {
    description: string;
    lines: IStudioWhyUsLine[];
}

export interface IStudioBase {
    hero: IStudioHero;
    about: IStudioAbout;
    partners: IStudioPartners;
    whyUs: IStudioWhyUs;
}

export interface IStudio {
    ar?: IStudioBase;
    en?: IStudioBase;
}

