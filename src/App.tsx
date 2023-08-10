import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import { NewCard } from './components/NewCard';
import { FlashCard } from './components/FlashCard';

import './App.css';
import { useState } from 'react';

interface flashCard {
	frontText: string;
	backText: string;
	id: number;
}

function App() {
	const [flashCardsList, setFlashCardList] = useState<flashCard[]>([]);
	const [isAdding, setIsAdding] = useState<boolean>(false);

	const handleAddCard = () => {
		setIsAdding((prev) => !prev);
	};

	const handleCancel = () => {
		setIsAdding(false);
	};

	return (
		<AppLayout>
			<AppHeader cardsQty={flashCardsList.length} onClick={handleAddCard} />
			<section className='section'>
				{isAdding && <NewCard onCancel={handleCancel} />}
				<ul className='cardsContainer'>
					{flashCardsList.map((card) => (
						<FlashCard />
					))}
				</ul>
			</section>
		</AppLayout>
	);
}

export default App;
