import { ChangeEvent, MouseEventHandler, useState } from "react";
import styles from "./FlashCardSide.module.css";
import newCardStyles from "./NewCard.module.css";
import editIcon from "../../public/icons/editIcon.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { NewCardSide } from "./NewCardSide";
import { CardButton } from "./CardButton";
import { CardSide, IFlashCard } from "../types/types";
import { initialValue } from "../data/initialInputValue";
import { IFlashCardProps } from "./FlashCard";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface IFlashCardSideProps extends IFlashCardProps {
  side: CardSide;
  flip: () => void;
}

export const FlashCardSide = ({
  cardContent,
  side,
  onSave,
  onDelete,
  flip,
}: IFlashCardSideProps) => {
  const [value, setValue] = useState<IFlashCard>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEdit: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    setIsEditing(true);

    const initialCardContent: IFlashCard = {
      front: cardContent.front,
      back: cardContent.back,
      _id: cardContent._id,
    };

    setValue(initialCardContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const updateField = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (value[side] === "") {
      return setError(`${capitalizeFirstLetter(side)} text is required!`);
    }

    if (cardContent._id) {
      onSave(cardContent._id, side, value[side]);
      setIsEditing(false);
      setError("");
    }
  };

  const handleDelete = () => {
    if (cardContent._id) {
      onDelete(cardContent._id);
    }
  };

  return (
    <>
      {!isEditing ? (
        <li className={styles.container} onClick={flip}>
          <p className={styles.text}>{cardContent[side]}</p>
          <button
            className={styles.editBtn}
            onClick={handleEdit}
            aria-label={`${side}EditBtn`}
          >
            <img src={editIcon} alt="Edit button icon" />
          </button>
        </li>
      ) : (
        <div className={newCardStyles.card}>
          <button className={newCardStyles.deleteBtn} onClick={handleDelete}>
            <img src={deleteIcon} alt="Delete icon" />
          </button>
          <form className={newCardStyles.form}>
            <NewCardSide
              name={side}
              updateField={updateField}
              value={value}
              error={error}
              setError={setError}
            >
              <CardButton
                variant="white"
                onClick={handleCancel}
                text="Cancel"
              />
              <CardButton variant="black" text="Save" onClick={handleSave} />
            </NewCardSide>
          </form>
        </div>
      )}
    </>
  );
};
