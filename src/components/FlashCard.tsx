import styles from "./FlashCard.module.css";
import newCardStyles from "./NewCard.module.css";
import editIcon from "../../public/icons/editIcon.svg";
import deleteIcon from "../../public/icons/deleteIcon.svg";
import { useState } from "react";
import { NewCardSide } from "./NewCardSide";
import { CardButton } from "./CardButton";

export const FlashCard = () => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      {isFront ? (
        <>
          {!isEditing ? (
            <li className={styles.container}>
              <p className={styles.text}>Tu będzie tekst fiszki</p>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(prev => !prev)}
              >
                <img src={editIcon} alt="Edit button icon" />
              </button>
            </li>
          ) : (
            <div className={newCardStyles.card}>
              <button className={newCardStyles.deleteBtn}>
                <img src={deleteIcon} alt="Delete icon" />
              </button>
              <form className={newCardStyles.form}>
                <NewCardSide name="frontSide" styles={newCardStyles}>
                  <CardButton variant="white" text="Cancel" />
                  <CardButton variant="black" text="Save" />
                </NewCardSide>
              </form>
            </div>
          )}
        </>
      ) : (
        <>
          {!isEditing ? (
            <li className={styles.container}>
              <p className={styles.text}>Tu będzie drugi tekst fiszki</p>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(prev => !prev)}
              >
                <img src={editIcon} alt="Edit button icon" />
              </button>
            </li>
          ) : (
            <div className={newCardStyles.card}>
              <button className={newCardStyles.deleteBtn}>
                <img src={deleteIcon} alt="Delete icon" />
              </button>
              <form className={newCardStyles.form}>
                <NewCardSide name="backSide" styles={newCardStyles}>
                  <CardButton variant="white" text="Cancel" />
                  <CardButton variant="black" text="Save" />
                </NewCardSide>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};
