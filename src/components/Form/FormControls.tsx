import { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import styles from "./FormControls.module.css";
import { CardSide, IFlashCard } from "@typings/types";

interface FormControlsProps {
  children: ReactNode;
  name: CardSide;
  updateField: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: IFlashCard;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const FormControls = ({
  children,
  name,
  updateField,
  value,
  error,
  setError,
}: FormControlsProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    setHeight();
    if (setError) {
      setError("");
    }
  };

  const setHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
    setHeight();
  }, [name]);

  return (
    <>
      <textarea
        ref={textareaRef}
        className={`${styles.textarea} ${error ? styles.invalid : null}`}
        rows={1}
        onInput={handleInput}
        name={name}
        onChange={updateField}
        value={value[name]}
      ></textarea>
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.btnBox}>{children}</div>
    </>
  );
};
