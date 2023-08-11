import { useState } from "react";

import { IFlashCardObj } from "../types/types";
import { FlashCardSide } from "./FlashCardSide";

export interface IFlashCardProps {
  cardContent: IFlashCardObj;
  onSave: (index: number, field: string, newText: string) => void;
  index: number;
}

export const FlashCard = (props: IFlashCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true);

  return (
    <>
      {isFront ? (
        <FlashCardSide side="frontSide" {...props} />
      ) : (
        <FlashCardSide side="backSide" {...props} />
      )}
    </>
  );
};
