export interface IHero {
  title: string[];
  description: string;
}

export interface IAbout {
  title: string[];
  description: string[];
}

export interface IHorizontal {
  link: {
    type: "firebase" | "external";
    url: string;
    path?: string;
    contentType?: string;
  };
  title: string[];
  slogan: string;
  description: string[];
}

export interface ITestimonialCard {
  name: string;
  title: string;
  message: string;
  rating: number;
}

export interface ITestimonial {
  title: string[];
  cards: ITestimonialCard[];
}

export interface ILocation {
  title: string;
  address: string;
  mapUrl: string;
}

export interface ILocationSection {
  title: string[];
  cards: ILocation[];
}

export interface IHomeBase {
  hero: IHero;
  about: IAbout;
  horizontal: IHorizontal[];
  testimonials: ITestimonial;
  locations: ILocationSection;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHome {
  ar?: IHomeBase;
  en?: IHomeBase;
  createdAt?: Date;
  updatedAt?: Date;
}
