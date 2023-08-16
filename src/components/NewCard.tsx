import { useState, ChangeEvent } from "react";
import styles from "./NewCard.module.css";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { NewCardSide } from "./NewCardSide";
import { CardButton } from "./CardButton";
import { IFlashCard } from "../types/types";
import { initialValue } from "../data/initialInputValue";

interface INewCardProps {
  onCancel: () => void;
  onSave: (flashCard: IFlashCard) => void;
}

export const NewCard = ({ onCancel, onSave }: INewCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const [value, setValue] = useState<IFlashCard>(initialValue);

  const handleChangeSide = () => setIsFront(prev => !prev);

  const handleSaveButtonClick = () => {
    onSave(value);
  };

  const updateField = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.card}>
      {!isFront && (
        <button className={styles.deleteBtn}>
          <img src={deleteIcon} alt="Delete icon" />
        </button>
      )}
      <form className={styles.form}>
        {isFront ? (
          <NewCardSide name="front" updateField={updateField} value={value}>
            <CardButton variant="white" onClick={onCancel} text="Cancel" />
            <CardButton
              variant="black"
              onClick={handleChangeSide}
              text="Next"
            />
          </NewCardSide>
        ) : (
          <NewCardSide name="back" updateField={updateField} value={value}>
            <CardButton
              variant="white"
              onClick={handleChangeSide}
              text="Back"
            />
            <CardButton
              variant="black"
              onClick={handleSaveButtonClick}
              text="Save"
            />
          </NewCardSide>
        )}
      </form>
    </div>
  );
};
