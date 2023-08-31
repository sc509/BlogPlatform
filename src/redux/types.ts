export interface Author {
    username: string;
    bio: string;
    image: string;
}

export interface Article {
    slug:string;
    title: string;
    tagList: string[] | number[];
    description: string;
    favorited:boolean;
    favoritesCount: number;
    author: Author;
    createdAt:number;
}

export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

export interface UserResponse {
    user:{
        email: string;
        token: string;
        username: string;
        bio: string;
        image: string;
    };
}

export interface NewUser {
    user: {
        username: string;
        email: string;
        password: string;
    };
    errors?: {
        email?: string;
        username?: string;
    };
}

export interface LoginUser {
    user: {
        email:string;
        password: string;
    };
    errors?: {
        email?: string;
        password?: string;
    }
}

export interface EditUser {
    user:{
        password: string,
        image?: string,
    };
    errors?:{
        password?: string,
        image?: string,
    }
}

export interface CreateArticle {
    article:{
        title: string,
        description: string,
        body: string,
        tagList?: string[];
    }
}

export interface EditArticle {
    article:{
        slug?:string,
        title:string,
        description: string,
        body: string,
        tagList?: string[];
    }
}

export interface DeleteArticle {
    slug?:string;
}