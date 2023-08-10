import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { ICharactersResponse, ICharacter } from "../interfaces";
import { marvelAPI } from "../apis/marvelAPI";

export const useFetchCharacter = (id: string, fetchOnMount = true) => {
  const [character, setCharacter] = useState<ICharacter>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<ICharactersResponse> =
          await marvelAPI.get(`/characters/${id}`);
        setCharacter(response.data.data.results[0]);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    if (fetchOnMount) void fetchCharacter();
  }, [fetchOnMount, id]);

  const mutateAsync = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<ICharactersResponse> = await marvelAPI.get(
        `/characters/${id}`
      );
      setCharacter(response.data.data.results[0]);
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return {
    character,
    loading,
    error,
    mutateAsync,
  };
};
