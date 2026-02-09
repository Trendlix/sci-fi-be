export interface IFile {
    url?: string;
    path?: string;
    contentType?: string;
    uploadedAt?: string;
}

export interface IEventHeroCard {
    title: string[];
    description: string;
    file?: IFile;
}

export interface IEventHero {
    cards: IEventHeroCard[];
}

export interface IEventAboutCard {
    icon: string;
    title: string;
    description: string;
}

export interface IEventAbout {
    title: string[];
    description: string;
    cards: IEventAboutCard[];
}

export interface IEventPartners {
    title: string[];
    description: string;
    files: IFile[];
}

export interface IEventNewsLetter {
    title: string[];
    description: string;
}

export interface IEventProgramCard {
    icon: string;
    description: string;
    features: string[];
}

export interface IEventProgram {
    vr_arena: IEventProgramCard;
    printing_lab_3d: IEventProgramCard;
    innovation_lab: IEventProgramCard;
    tech_museum: IEventProgramCard;
    digital_art_studio: IEventProgramCard;
}

export interface IEventHowCard {
    file?: IFile;
    icon: string;
    title: string;
    description: string;
    highlights: string[];
}

export interface IEventHow {
    description: string;
    cards: IEventHowCard[];
}

export interface IEventReadyCard {
    icon: string;
    no: number;
    title: string;
}

export interface IEventReady {
    description: string;
    cards: IEventReadyCard[];
}

export interface IEventFeaturedCard {
    file?: IFile;
    tag: string;
    title: string;
    highlights: string[];
    description: string;
}

export interface IEventFeatured {
    title: string[];
    description: string;
    cards: IEventFeaturedCard[];
}

export interface IEventUpcomingCard {
    type: string;
    file?: IFile;
    tag: string;
    title: string;
    highlights: string[];
    description: string;
    cta: string;
}

export interface IEventBase {
    hero: IEventHero;
    about: IEventAbout;
    partners: IEventPartners;
    program: IEventProgram;
    newsLetter: IEventNewsLetter;
    how: IEventHow;
    ready: IEventReady;
    featured: IEventFeatured;
    upcoming: IEventUpcomingCard[];
}

export interface IEvent {
    ar?: IEventBase;
    en?: IEventBase;
}

