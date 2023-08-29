export type IFlashCard = {
  front: string;
  back: string;
  _id?: string;
};

export type EditPayload =
  | { front: string }
  | { back: string }
  | { [key: string]: string };

export enum CardSide {
  FRONT = "front",
  BACK = "back",
}
