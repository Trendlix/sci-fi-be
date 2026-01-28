export interface IHero {
  title: string[];
  description: string;
}

export interface IAbout {
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

export interface IAvatar {
  url?: string;
  path?: string;
  contentType?: string;
  uploadedAt?: Date;
}

export interface ITestimonial {
  name: string;
  title?: string;
  message: string;
  rating: number;
  avatar?: IAvatar;
}

export interface ILocation {
  title: string;
  address: string;
  mapUrl: string;
}

export interface IHomeBase {
  hero: IHero;
  about: IAbout;
  horizontal: IHorizontal[];
  testimonials: ITestimonial[];
  locations: ILocation[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHome {
  ar?: IHomeBase;
  en?: IHomeBase;
  createdAt?: Date;
  updatedAt?: Date;
}
