import { useState, ChangeEvent } from "react";
import styles from "./NewCard.module.css";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { NewCardSide } from "./NewCardSide";
import { CardButton } from "./CardButton";
import { CardSide, IFlashCard } from "../types/types";
import { initialValue } from "../data/initialInputValue";

interface INewCardProps {
  onCancel: () => void;
  onSave: (flashCard: IFlashCard) => void;
}

export const NewCard = ({ onCancel, onSave }: INewCardProps) => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const [value, setValue] = useState<IFlashCard>(initialValue);
  const [error, setError] = useState<string>("");

  const handleChangeSide = () => {
    if (value.front === "") {
      setError("Front text is required");
    } else {
      setIsFront(prev => !prev);
      setError("");
    }
  };

  const handleSaveButtonClick = () => {
    if (value.back === "") {
      setError("Back text is required");
    } else {
      onSave(value);
      setError("");
    }
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
          <NewCardSide
            name={CardSide.FRONT}
            updateField={updateField}
            value={value}
            error={error}
            setError={setError}
          >
            <CardButton variant="white" onClick={onCancel} text="Cancel" />
            <CardButton
              variant="black"
              onClick={handleChangeSide}
              text="Next"
            />
          </NewCardSide>
        ) : (
          <NewCardSide
            name={CardSide.BACK}
            updateField={updateField}
            value={value}
            error={error}
            setError={setError}
          >
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
