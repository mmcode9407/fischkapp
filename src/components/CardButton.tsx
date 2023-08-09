import styles from './CardButton.module.css';

interface buttonProps {
	variant: 'white' | 'black';
	onClick?: () => void;
	text: string;
}

export const CardButton = ({ variant, onClick, text }: buttonProps) => {
	return (
		<button
			className={`${styles.btn} ${styles[variant]}`}
			onClick={onClick}
			type='button'>
			{text}
		</button>
	);
};
