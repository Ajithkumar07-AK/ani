export interface AnimeShow {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
  episodes: number;
  year: string;
  genres: string[];
  isPopular: boolean;
  featured?: boolean;
}

export interface UserSession {
  name: string;
  email: string;
  loggedInAt: string;
}
