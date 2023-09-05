import styles from "./FormButton.module.css";

interface IButtonProps {
  variant: "white" | "black";
  onClick?: () => void;
  text: string;
}

export const FormButton = ({ variant, onClick, text }: IButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};
