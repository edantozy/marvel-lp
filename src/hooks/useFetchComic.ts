import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { IComicsResponse, IComic } from "../interfaces";
import { marvelAPI } from "../apis/marvelAPI";

export const useFetchComic = (id: string, fetchOnMount = true) => {
  const [comic, setComic] = useState<IComic>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<IComicsResponse> = await marvelAPI.get(
          `/comics/${id}`
        );
        setComic(response.data.data.results[0]);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    if (fetchOnMount) void fetchComics();
  }, [fetchOnMount, id]);

  const mutateAsync = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<IComicsResponse> = await marvelAPI.get(
        `/comics/${id}`
      );
      setComic(response.data.data.results[0]);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return {
    comic,
    loading,
    error,
    mutateAsync,
  };
};
