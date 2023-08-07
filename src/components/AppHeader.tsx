import styles from './AppHeader.module.css';
import appLogo from '../../public/fishkapp_logo.svg';
import addIcon from '../../public/icons/addIcon.svg';
import { useState } from 'react';

export const AppHeader = () => {
	const [cards, setCards] = useState<number>(0);

	const handleAddCard = () => {
		setCards((prev) => prev + 1);
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<img src={appLogo} alt='App logo' />
				<p>Cards: {cards}</p>
			</div>
			<button className={styles.add__btn} onClick={handleAddCard}>
				<img src={addIcon} alt='Add icon' />
			</button>
		</header>
	);
};
