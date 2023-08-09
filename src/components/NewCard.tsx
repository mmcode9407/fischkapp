import { ChangeEvent, useState } from 'react';
import styles from './NewCard.module.css';
import deleteIcon from '../../public/icons/deleteIcon.svg';
import { NewCardSide } from './NewCardSide';
import { CardButton } from './CardButton';

export const NewCard = () => {
	const [isFront, setIsFront] = useState<boolean>(true);

	const handleChangeSide = () => {
		setIsFront((prev) => !prev);
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
						<CardButton variant='white' text='Cancel' />
						<CardButton
							variant='black'
							onClick={handleChangeSide}
							text='Next'
						/>
					</NewCardSide>
				) : (
					<NewCardSide name='backSide' styles={styles}>
						<CardButton
							variant='black'
							onClick={handleChangeSide}
							text='Back'
						/>
						<CardButton variant='white' text='Save' />
					</NewCardSide>
				)}
			</form>
		</div>
	);
};
