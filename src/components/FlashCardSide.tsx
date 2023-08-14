import { ChangeEvent, MouseEventHandler, useState } from "react";
import styles from "./FlashCardSide.module.css";
import newCardStyles from "./NewCard.module.css";
import editIcon from "../../public/icons/editIcon.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { NewCardSide } from "./NewCardSide";
import { CardButton } from "./CardButton";
import { IFlashCard } from "../types/types";
import { initialValue } from "../data/initialInputValue";
import { IFlashCardProps } from "./FlashCard";

interface IFlashCardSideProps extends IFlashCardProps {
  side: "front" | "back";
  flip: () => void;
}

export const FlashCardSide = ({
  cardContent,
  side,
  onSave,
  index,
  onDelete,
  flip,
}: IFlashCardSideProps) => {
  const [value, setValue] = useState<IFlashCard>(initialValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    setIsEditing(true);

    const initialCardContent: IFlashCard = {
      front: cardContent.front,
      back: cardContent.back,
    };
    setValue(initialCardContent);
  };

  const handleCancel = () => setIsEditing(false);

  const updateField = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(index, side, value[side]);
    handleCancel();
  };

  const handleDelete = () => {
    onDelete(index);
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <li className={styles.container} onClick={flip}>
          <p className={styles.text}>{cardContent[side]}</p>
          <button className={styles.editBtn} onClick={handleEdit}>
            <img src={editIcon} alt="Edit button icon" />
          </button>
        </li>
      ) : (
        <div className={newCardStyles.card}>
          <button className={newCardStyles.deleteBtn} onClick={handleDelete}>
            <img src={deleteIcon} alt="Delete icon" />
          </button>
          <form className={newCardStyles.form}>
            <NewCardSide name={side} updateField={updateField} value={value}>
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
