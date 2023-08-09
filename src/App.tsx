import { AppHeader } from './components/AppHeader';
import { AppLayout } from './components/AppLayout';
import { NewCard } from './components/NewCard';

import './App.css';

function App() {
	return (
		<AppLayout>
			<AppHeader />
			<NewCard />
		</AppLayout>
	);
}

export default App;
