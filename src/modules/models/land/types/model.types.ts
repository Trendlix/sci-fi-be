export type ILandFile = {
    url?: string;
    path?: string;
    contentType?: string;
    uploadedAt?: string;
};

export interface ILandHero {
    title: string[];
    description: string;
    file?: ILandFile;
}

export interface IDiscoverCard {
    title: string;
    description?: string;
    icon: ILandFile;
    link: string;
}

export interface IDiscoverFloors {
    title: string[];
    description: string;
    cards: IDiscoverCard[];
}

export interface IFloor {
    title: string;
    description: string;
    file: ILandFile;
    floor?: string;
}


export interface IServiceBirthDayPartyPriceItem {
    price: number;
    per: string;
}

export interface IServiceBirthDayPartyPackage {
    title: string;
    oldPrice?: number;
    price: {
        weekdays?: IServiceBirthDayPartyPriceItem;
        weekends?: IServiceBirthDayPartyPriceItem;
    };
    description: string[];
    highlights: string[];
}

export interface IServiceBirthDayPartyPrincePackage {
    hidden: boolean;
    title?: string;
    description?: string;
}

export interface IServiceBirthDayParty {
    modalDescription: string;
    price: number;
    description: string;
    files?: ILandFile[];
    packages: {
        list: IServiceBirthDayPartyPackage[];
        prince: IServiceBirthDayPartyPrincePackage;
    };
}

export interface IServiceMembershipPackagesHoursHighlight {
    no: number;
    line: string;
}

export interface IServiceMembershipPackagesHoursItem {
    icon: string;
    highlight: IServiceMembershipPackagesHoursHighlight;
}

export interface IServiceMembershipPackagesTotalTime {
    icon: string;
    line: string;
}

export interface IServiceMembershipPackagesCard {
    icon: string;
    title: string;
    hours: {
        perMonth: IServiceMembershipPackagesHoursItem;
        perWeek: IServiceMembershipPackagesHoursItem;
        perSession: IServiceMembershipPackagesHoursItem;
        totalTime: IServiceMembershipPackagesTotalTime;
    };
    oldPricePerMonth: number;
    pricePerMonth: number;
    highlights: string[];
    isPopular: boolean;
}

export interface IServiceMembershipPackages {
    price: number;
    description: string;
    files?: ILandFile[];
    packages: {
        description: string;
        years: {
            3: IServiceMembershipPackagesCard[];
            6: IServiceMembershipPackagesCard[];
        };
    };
}

export interface IServiceSchoolTripsAndNurseryHighlightLine {
    title: string;
    description: string;
}

export interface IServiceSchoolTripsAndNurseryHighlights {
    icon: string;
    line: IServiceSchoolTripsAndNurseryHighlightLine;
}

export interface IServiceSchoolTripsAndNurseryBase {
    description: string;
    highlights: IServiceSchoolTripsAndNurseryHighlights;
}

export interface IServiceSchoolTripsAndNursery {
    schoolTrips: IServiceSchoolTripsAndNurseryBase;
    nursery: IServiceSchoolTripsAndNurseryBase;
}

export interface IServiceWalkinCard {
    icon: string;
    title: string;
    description: string;
}

export interface IServiceWalkinHighlightCard {
    icon: string;
    title: string;
    highlights: string[];
}

export interface IJoinerFloorFile {
    tag: string;
    url: string;
    path: string;
    contentType?: string;
    uploadedAt?: string;
}

export interface IServiceWalkinFloor {
    description: string[];
    files: IJoinerFloorFile[];
}

export interface IServiceWalkin {
    firstCards: IServiceWalkinCard[];
    lastCards: IServiceWalkinHighlightCard[];
    joinerFloor: IServiceWalkinFloor;
    geniusFloor: IServiceWalkinFloor;
}

export interface IServices {
    title: string[];
    description: string;
    birthDayParty: IServiceBirthDayParty;
    membershipPackages: IServiceMembershipPackages;
    schoolTripsAndNursery: IServiceSchoolTripsAndNursery;
    walkin: IServiceWalkin;
}

export interface ILandBase {
    hero: ILandHero;
    discoverFloors: IDiscoverFloors;
    floors: IFloor[];
    testimonialsTitle: string[];
    services: IServices;
}

export interface ILand {
    ar?: ILandBase;
    en?: ILandBase;
}

