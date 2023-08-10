import { IStories, IThumbnail, IURL } from ".";

export interface IComicsResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: IComicsData;
}

export interface IComicsData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IComic[];
}

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: IIsbn;
  upc: string;
  diamondCode: IDiamondCode;
  ean: string;
  issn: string;
  format: IFormat;
  pageCount: number;
  textObjects: ITextObject[];
  resourceURI: string;
  urls: IURL[];
  series: ISeriesMini;
  variants: ISeriesMini[];
  collections: [];
  collectedIssues: [];
  dates: IDateElement[];
  prices: IPrice[];
  thumbnail: IThumbnail;
  images: IThumbnail[];
  creators: ICreators;
  characters: ICharacters;
  stories: IStories;
  events: ICharacters;
}

export interface ICharacters {
  available: number;
  collectionURI: string;
  items: ISeriesMini[];
  returned: number;
}

export interface ISeriesMini {
  resourceURI: string;
  name: string;
}

export interface ICreators {
  available: number;
  collectionURI: string;
  items: ICreatorsItem[];
  returned: number;
}

export interface ICreatorsItem {
  resourceURI: string;
  name: string;
  role: string;
}

export interface IDateElement {
  type: IDateType;
  date: string;
}

export enum IDateType {
  DigitalPurchaseDate = "digitalPurchaseDate",
  FocDate = "focDate",
  OnsaleDate = "onsaleDate",
  UnlimitedDate = "unlimitedDate",
}

export enum IDiamondCode {
  Empty = "",
  Jul190068 = "JUL190068",
}

export enum IFormat {
  Comic = "Comic",
  Empty = "",
  TradePaperback = "Trade Paperback",
}

export enum IIsbn {
  Empty = "",
  The0785107991 = "0-7851-0799-1",
}

export interface IPrice {
  type: PriceType;
  price: number;
}

export enum PriceType {
  DigitalPurchasePrice = "digitalPurchasePrice",
  PrintPrice = "printPrice",
}

export interface ITextObject {
  type: string;
  language: string;
  text: string;
}