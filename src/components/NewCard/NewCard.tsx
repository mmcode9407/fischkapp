import { useState, ChangeEvent } from "react";
import styles from "./NewCard.module.css";
import deleteIcon from "@icons/deleteIcon.svg";
import { FormControls } from "@components/Form/FormControls";
import { FormButton } from "@components/Form/FormButton";
import { CardSide, IFlashCard } from "@typings/types";
import { initialValue } from "@data/initialInputValue";

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
        <button className={styles.deleteBtn} onClick={onCancel}>
          <img src={deleteIcon} alt="Delete icon" />
        </button>
      )}
      <form className={styles.form}>
        {isFront ? (
          <FormControls
            name={CardSide.FRONT}
            updateField={updateField}
            value={value}
            error={error}
            setError={setError}
          >
            <FormButton variant="white" onClick={onCancel} text="Cancel" />
            <FormButton
              variant="black"
              onClick={handleChangeSide}
              text="Next"
            />
          </FormControls>
        ) : (
          <FormControls
            name={CardSide.BACK}
            updateField={updateField}
            value={value}
            error={error}
            setError={setError}
          >
            <FormButton
              variant="white"
              onClick={handleChangeSide}
              text="Back"
            />
            <FormButton
              variant="black"
              onClick={handleSaveButtonClick}
              text="Save"
            />
          </FormControls>
        )}
      </form>
    </div>
  );
};
