import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import { NewCard } from './components/NewCard';
import { FlashCard } from './components/FlashCard';

import './App.css';

function App() {
	const flashCardsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	return (
		<AppLayout>
			<AppHeader />
			{/* <NewCard /> */}
			<ul className='cardsContainer'>
				{flashCardsList.map((card) => (
					<FlashCard />
				))}
			</ul>
		</AppLayout>
	);
}

export default App;
