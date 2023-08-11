export interface IFlashCard {
  frontSide: string;
  backSide: string;
}

export interface IFlashCardObj extends IFlashCard {
  id: number;
}

export type InputValues = {
  frontSide: string;
  backSide: string;
};
