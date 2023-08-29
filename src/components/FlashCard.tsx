import { useState } from "react";

import { CardSide, IFlashCard } from "../types/types";
import { FlashCardSide } from "./FlashCardSide";
import ReactCardFlip from "react-card-flip";

export interface IFlashCardProps {
  cardContent: IFlashCard;
  onSave: (index: string, field: CardSide, newText: string) => void;
  onDelete: (index: string) => void;
}

export const FlashCard = (props: IFlashCardProps) => {
  const [isBack, setIsBack] = useState<boolean>(false);

  const handleFlip = () => setIsBack(prev => !prev);

  return (
    <ReactCardFlip isFlipped={isBack} containerStyle={{ width: "100%" }}>
      <FlashCardSide side={CardSide.FRONT} flip={handleFlip} {...props} />
      <FlashCardSide side={CardSide.BACK} flip={handleFlip} {...props} />
    </ReactCardFlip>
  );
};
