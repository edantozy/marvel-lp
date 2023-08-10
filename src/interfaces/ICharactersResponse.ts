import { IStories, IThumbnail, IURL } from ".";

export interface ICharactersResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: ICharactersData;
}

export interface ICharactersData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  resourceURI: string;
  comics: IComics;
  series: ISeries;
  stories: IStories;
  events: IEvents;
  urls: IURL[];
}

export interface IComics {
  available: number;
  collectionURI: string;
  items: IComicsItem[];
  returned: number;
}

export interface ISeries {
  available: number;
  collectionURI: string;
  items: ISeriesItem[];
  returned: number;
}

export interface IEvents {
  available: number;
  collectionURI: string;
  items: IEventsItem[];
  returned: number;
}

export interface IComicsItem {
  resourceURI: string;
  name: string;
}

export interface ISeriesItem {
  resourceURI: string;
  name: string;
}

export interface IEventsItem {
  resourceURI: string;
  name: string;
}
