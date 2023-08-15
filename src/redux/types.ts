export interface Author {
    username: string;
    bio: string;
    image: string;
}

export interface Article {
    title: string;
    tagList: string[] | number[];
    description: string;
    favoritesCount: number;
    author: Author;
    createdAt:number;
}

export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}