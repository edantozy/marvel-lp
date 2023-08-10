import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { ICharactersResponse, ICharacter } from "../interfaces";
import { marvelAPI } from "../apis/marvelAPI";

export const useFetchCharacters = (initialSearch = "", fetchOnMount = true) => {
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<ICharactersResponse> =
          await marvelAPI.get("/characters", {
            params: {
              limit: 12,
              offset,
              /* nameStartsWith only when exists */
              ...(search && {
                nameStartsWith: search,
              }),
            },
          });
        setCharacters(response.data.data.results);
        setTotal(response.data.data.total);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    if (fetchOnMount) void fetchCharacters();
  }, [search, fetchOnMount, offset]);

  const mutateAsync = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<ICharactersResponse> = await marvelAPI.get(
        "/characters",
        {
          params: {
            limit: 12,
            offset,
            /* nameStartsWith only when exists */
            ...(search && {
              nameStartsWith: search,
            }),
          },
        }
      );
      setCharacters(response.data.data.results);
      setTotal(response.data.data.total);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return {
    characters,
    loading,
    error,
    setOffset,
    mutateAsync,
    search,
    setSearch,
    total,
  };
};
