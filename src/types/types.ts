export interface IFlashCard {
  front: string;
  back: string;
  [key: string]: string;
}

export type EditPayload =
  | { front: string }
  | { back: string }
  | { [key: string]: string };
