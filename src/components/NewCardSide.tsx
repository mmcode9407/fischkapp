import { ChangeEvent, ReactNode, useEffect, useRef } from "react";
import styles from "./NewCardSide.module.css";
import { IFlashCard } from "../types/types";

interface NewCardSideProps {
  children: ReactNode;
  name: string;
  updateField: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: IFlashCard;
}

export const NewCardSide = ({
  children,
  name,
  updateField,
  value,
}: NewCardSideProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
    setHeight();
  }, []);

  return (
    <>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={1}
        onInput={setHeight}
        name={name}
        onChange={updateField}
        value={value[name]}
      ></textarea>
      <div className={styles.btnBox}>{children}</div>
    </>
  );
};
