import { ChangeEvent, ReactNode } from 'react';

interface NewCardSideProps {
	children: ReactNode;
	styles: { [key: string]: string };
	name: string;
}

export const NewCardSide = ({ children, styles, name }: NewCardSideProps) => {
	const setHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<>
			<textarea
				className={styles.textarea}
				rows={1}
				onInput={setHeight}
				name={name}></textarea>
			<div className={styles.btnBox}>{children}</div>
		</>
	);
};
