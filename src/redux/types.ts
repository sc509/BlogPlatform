export interface Author {
  username: string;
  bio: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  tagList: string[];
  description: string;
  favorited: boolean;
  favoritesCount: string;
  author: Author;
  createdAt: number;
  data?: string[];
  body?: string;
  unFavoritedArticle?: boolean;
  favoritedArticle?: boolean;
}

export interface ArticleResponse {
  article: Article;
  articlesCount: number;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface UserResponse {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  data:string;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
  errors?: {
    email?: string;
    username?: string;
  };
}

export interface LoginUser {
    email: string;
    password: string;
  errors?: {
    email?: string;
    password?: string;
  };
}

export interface EditUser {
  password: string;
  image?: string;
  errors?: {
    password?: string;
    image?: string;
  };
}

export interface CreateArticle {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
}

export interface EditArticle {
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface DeleteArticle {
  slug?: string;
}
