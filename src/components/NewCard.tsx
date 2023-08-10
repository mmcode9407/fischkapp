import { useState } from 'react';
import styles from './NewCard.module.css';
import deleteIcon from '../../public/icons/deleteIcon.svg';
import { NewCardSide } from './NewCardSide';
import { CardButton } from './CardButton';
import { flashCard } from '../types/types';

interface NewCardProps {
	onCancel: () => void;
	onSave: (flashCard: flashCard) => void;
}

export const NewCard = ({ onCancel, onSave }: NewCardProps) => {
	const [isFront, setIsFront] = useState<boolean>(true);

	const handleChangeSide = () => {
		setIsFront((prev) => !prev);
	};

	const handleSaveButtonClick = () => {
		onSave({ frontText: '', backText: '' });
		onCancel();
	};

	return (
		<div className={styles.card}>
			{!isFront && (
				<button className={styles.deleteBtn}>
					<img src={deleteIcon} alt='Delete icon' />
				</button>
			)}
			<form className={styles.form}>
				{isFront ? (
					<NewCardSide name='frontSide' styles={styles}>
						<CardButton variant='white' onClick={onCancel} text='Cancel' />
						<CardButton
							variant='black'
							onClick={handleChangeSide}
							text='Next'
						/>
					</NewCardSide>
				) : (
					<NewCardSide name='backSide' styles={styles}>
						<CardButton
							variant='white'
							onClick={handleChangeSide}
							text='Back'
						/>
						<CardButton
							variant='black'
							onClick={handleSaveButtonClick}
							text='Save'
						/>
					</NewCardSide>
				)}
			</form>
		</div>
	);
};
