import { useState } from "react";

import { IFlashCardObj } from "../types/types";
import { FlashCardSide } from "./FlashCardSide";
import ReactCardFlip from "react-card-flip";

export interface IFlashCardProps {
  cardContent: IFlashCardObj;
  onSave: (index: number, field: string, newText: string) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const FlashCard = (props: IFlashCardProps) => {
  const [isBack, setIsBack] = useState<boolean>(false);

  const handleFlip = () => setIsBack(prev => !prev);

  return (
    <ReactCardFlip isFlipped={isBack} containerStyle={{ width: "100%" }}>
      <FlashCardSide side="frontSide" flip={handleFlip} {...props} />
      <FlashCardSide side="backSide" flip={handleFlip} {...props} />
    </ReactCardFlip>
  );
};
