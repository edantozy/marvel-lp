import axios from "axios";

const marvelAPI = axios.create({
  baseURL: import.meta.env.VITE_MARVEL_API_URL,
});

marvelAPI.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      apikey: import.meta.env.VITE_API_KEY,
      ts: import.meta.env.VITE_TS,
      hash: import.meta.env.VITE_HASH,
      ...config.params,
    },
  };
});

export { marvelAPI };
