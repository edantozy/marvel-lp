export enum IExtension {
  GIF = "gif",
  Jpg = "jpg",
}

export interface IStories {
  available: number;
  collectionURI: string;
  items: IStoriesItem[];
  returned: number;
}

export interface IStoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
}

export enum ItemType {
  Ad = "ad",
  Backcovers = "backcovers",
  Cover = "cover",
  Empty = "",
  InteriorStory = "interiorStory",
  Pinup = "pinup",
  TextArticle = "text article",
}

export interface IThumbnail {
  path: string;
  extension: IExtension;
}

export interface IURL {
  type: string;
  url: string;
}
