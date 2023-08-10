import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import { NewCard } from './components/NewCard';
import { FlashCard } from './components/FlashCard';

import './App.css';

function App() {
	const flashCardsList = [1];
	return (
		<AppLayout>
			<AppHeader />
			<section className='section'>
				<NewCard />
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
