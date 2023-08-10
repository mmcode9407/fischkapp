import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";

interface NewCardSideProps {
  children: ReactNode;
  styles: { [key: string]: string };
  name: string;
}

export const NewCardSide = ({ children, styles, name }: NewCardSideProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={1}
        onInput={setHeight}
        name={name}
      ></textarea>
      <div className={styles.btnBox}>{children}</div>
    </>
  );
};
