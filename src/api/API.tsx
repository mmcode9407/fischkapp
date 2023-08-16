import { IFlashCard } from "../types/types";

const API_LINK: string =
  "https://training.nerdbord.io/api/v1/fischkapp/flashcards";

interface IFetchOptions {
  method: "POST";
  body: string;
  headers: {
    "Content-Type": "application/json";
    Authorization: string;
  };
}

export const postNewFlashCard = (data: IFlashCard) => {
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

const _fetchData = async (options: IFetchOptions, additionalPath = "") => {
  const API_URL = `${API_LINK}${additionalPath}`;

  const resp = await fetch(API_URL, options);

  if (resp.ok) {
    return resp.json();
  }

  if (resp.status === 400) {
    throw new Error("Flashcard already exists");
  }
};
