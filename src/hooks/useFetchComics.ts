import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IComicsResponse, IComic } from "../interfaces";
import { marvelAPI } from "../apis/marvelAPI";

export const useFetchComics = (initialSearch = "", fetchOnMount = true) => {
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [comics, setComics] = useState<IComic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<IComicsResponse> = await marvelAPI.get(
          "/comics",
          {
            params: {
              limit: 12,
              offset,
              /* nameStartsWith only when exists */
              ...(search && {
                titleStartsWith: search,
              }),
            },
          }
        );
        setComics(response.data.data.results);
        setTotal(response.data.data.total);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    if (fetchOnMount) void fetchComics();
  }, [search, fetchOnMount, offset]);

  const mutateAsync = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<IComicsResponse> = await marvelAPI.get(
        "/comics",
        {
          params: {
            limit: 12,
            offset,
            /* nameStartsWith only when exists */
            ...(search && {
              titleStartsWith: search,
            }),
          },
        }
      );
      setComics(response.data.data.results);
      setTotal(response.data.data.total);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return {
    comics,
    loading,
    error,
    setOffset,
    mutateAsync,
    search,
    setSearch,
    total,
  };
};
