import styles from "./AppHeader.module.css";
import appLogo from "../../../public/fishkapp_logo.svg";
import addIcon from "../../../public/icons/addIcon.svg";

interface IAppHeaderProps {
  cardsQty: number;
  onClick: () => void;
}

export const AppHeader = ({ cardsQty, onClick }: IAppHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={appLogo} alt="App logo" />
        <p>Cards: {cardsQty}</p>
      </div>
      <button className={styles.add__btn} onClick={onClick} aria-label="addBtn">
        <img src={addIcon} alt="Add icon" />
      </button>
    </header>
  );
};
