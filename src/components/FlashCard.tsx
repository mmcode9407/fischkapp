import { useState } from "react";

import { IFlashCardObj } from "../types/types";
import { FlashCardSide } from "./FlashCardSide";

export interface IFlashCardProps {
  cardContent: IFlashCardObj;
  onSave: (index: number, field: string, newText: string) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const FlashCard = (props: IFlashCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true);

  const handleFlip = () => setIsFront(prev => !prev);

  return (
    <>
      {isFront ? (
        <FlashCardSide side="frontSide" flip={handleFlip} {...props} />
      ) : (
        <FlashCardSide side="backSide" flip={handleFlip} {...props} />
      )}
    </>
  );
};
