export interface ISeoBase {
    filesAlt: string;
    title: string;
    description: string;
    keywords: string[];
}

export interface ISeoSection {
    home: ISeoBase;
    about: ISeoBase;
    contact: ISeoBase;
    events: ISeoBase;
    studio: ISeoBase;
    land: ISeoBase;
}

export interface ISeo {
    ar?: ISeoSection;
    en?: ISeoSection;
}

