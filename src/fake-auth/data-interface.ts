import { IThumbnail } from "../interfaces";

export interface IUser {
    id: number;
    name: string;
    date_of_birth: string;
    email: string;
    password: string;
    created_at: string;
    favorites: {
        characters: IMiniCharacter[];
        comics: IMiniComic[];
    }
}

export interface IMiniComic {
    id: number;
    title: string;
    thumbnail: IThumbnail;
}

export interface IMiniCharacter {
    id: number;
    name: string;
    thumbnail: IThumbnail;
}