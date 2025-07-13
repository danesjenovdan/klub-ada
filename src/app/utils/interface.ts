export interface Post {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  body: any;
  categories: { label: string }[];
  _id: string;
  mainImage: any;
}

export interface Category {
  name: string;
  slug: { current: string };
  _id: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: any;
  bio: string;
  linkedin: string;
  _id: string;
}

export interface Event {
  title: string;
  slug: {
    current: string;
  };
  eventTime: string;
  description: any;
  _id: string;
  eventImage: {
    url: string;
    alt: string;
  };
}
