import { IFlashCard } from "../types/types";

const API_LINK = "https://training.nerdbord.io/api/v1/fischkapp/flashcards";

interface IFetchOptions {
  method: "POST";
  body: string;
  headers: {
    "Content-Type": "application/json";
    Authorization: string;
  };
}

export const post = (data: IFlashCard) => {
  const options: IFetchOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "secret_token",
    },
  };

  return _fetchData(options);
};

const _fetchData = (options: IFetchOptions, additionalPath = "") => {
  const API_URL = `${API_LINK}${additionalPath}`;

  return fetch(API_URL, options).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    throw new Error(resp.status.toString());
  });
};
